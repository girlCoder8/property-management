const express = require('express');
const router = express.Router();
const properties = require('../models/properties');
const owners = require('../models/owners');
const tenants = require('../models/tenants');
const units = require('../models/units');
const checkAuth = require('../middlewares/checkAuth');
router.post('/addproperty', checkAuth, (req, res) => {
    owners.findOne({ userid: req.session.userid }).then((result) => {
        console.log(result);
        if (result) {
            const newProperty = new properties({
                owner_id: result._id,
                property_name: req.body.property_name,
                address: req.body.address,
                units: []
            })
            newProperty.save().then((result) => {

                owners.updateOne({ userid: req.session.userid }, {
                    $push: {
                        properties: result._id
                    }
                }).then((result) => {

                    res.sendStatus(200)
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err) => {
                console.log(err)
            })
        }
    }).catch((err) => {
        console.log(err)
    })
})


router.get('/properties', (req, res) => {
    console.log(req.session.id)

    owners.findOne({ userid: req.session.userid })
        .then((result) => {
            properties.find({ owner_id: result._id }).then((result) => {
                res.json(result)
            }).catch((err) => {
                console.log(err)
            })

            console.log(result, "in get properties")
        })
        .catch((err) => {
            console.log(err)
        })
});



router.get('/:id', (req, res) => {
    properties.findById(req.params.id)
        .then((result) => {
                if (result) {
                    const houses = result.units
                    console.log(houses, "in get houses")
                    units.find({ _id: { $in: houses } }).then((result) => {
                        console.log(result, "in response sending of units")
                        res.send(result)
                    }).catch((err) => {
                        console.log(err)
                    })
                }
            }
        )
        .catch((err) => {
                console.log(err)
            }
        )
});

router.put('/:id/edithouse/:h_id', checkAuth, async (req, res) => {
    console.log(req.body, "in put houses");
    try {
        const update = {
            unitName: req.body.unitName,
            monthlyRent: req.body.monthlyRent,
            bedrooms: req.body.bedrooms,
        };
        if (req.body.tenant_email) {
            const tenant = await tenants.findOne({ email: req.body.tenant_email });
            if (tenant) {
                update.tenant_id = tenant._id;
            } else {
                throw new Error("Tenant Not Found");
            }
        }
        await units.findOneAndUpdate({ _id: req.params.h_id }, { $set: update });
        properties.findById(req.params.id)
            .then((result) => {
                    if (result) {
                        const houses = result.units
                        console.log(houses, "in get houses")
                        units.find({ _id: { $in: houses } }).then((result) => {
                            console.log(result, "in response sending of units")
                            res.send(result)
                        }).catch((err) => {
                            console.log(err)
                        })
                    }
                }
            )
    } catch (err) {
        console.log(err);
        res.status(404).send({ msg: err.message });
    }


})

router.delete('/:id/deletehouse/:h_id', checkAuth, (req, res) => {
    properties.findOneAndUpdate({ _id: req.params.id }, {
        $pull: {
            units: req.params.h_id
        }
    }).then((result) => {
        console.log(result, "result in then of properties pull")
        units.deleteOne({ _id: req.params.h_id }).then((result1) => {

            response = result.units.filter((unit) => {
                    return unit !== req.params.h_id
                }
            )
            units.find({ _id: { $in: response } }).then((result) => {
                console.log(result, "result in then of units find")
                res.send(result)
            }).catch((err) => {
                console.log(err)
            })
        })


    }).catch((err) => {
        console.log(err)
    })
})

router.delete('/deleteproperty/:id', checkAuth, (req, res) => {
    properties.findOneAndDelete({ _id: req.params.id }).then((result) => {
        console.log(result, "result in then of properties delete")
        owners.findOneAndUpdate({ userid: req.session.userid }, {
            $pull: {
                properties: req.params.id
            }
        }).then((result) => {
            console.log(result, "result in then of owners pull");
        })
        units.deleteMany({ _id: { $in: result.units } }).then((result) => {
                console.log(result, "result in then of units delete");
            }
        )
    }).catch((err) => {
        console.log(err)
    })
})



router.post('/:id/addunit', checkAuth, (req, res) => {
    console.log(req.body, "req body in post add unit")
    properties.findOne({ _id: req.params.id }).then((result) => {
        console.log(result, "in post add unit")
        if (result) {
            const newUnit = new units({
                unitName: req.body.unitName,
                monthlyRent: req.body.monthlyRent,
                bedrooms: req.body.bedrooms,

            })
            newUnit.save().then((result) => {
                console.log(result, "in save unit")
                console.log(result._id, "in then of properties update")
                properties.findOneAndUpdate({ _id: req.params.id }, {
                    $push: {
                        units: result._id
                    }
                }).then((old_property) => {
                    console.log(old_property, "in then push unit")
                    units.find({ _id: { $in: old_property.units } }).then((old_units) => {
                        old_units.push(result)
                        console.log(old_units, "in response sending of units")
                        res.send(old_units)
                    }).catch((err) => {
                        console.log(err)
                    })
                }).catch((err) => {
                        console.log(err)
                    }
                )
            }).catch((err) => {
                console.log(err)
            })

        }
    }).catch((err) => {
        console.log(err)
        res.sendStatus(500)
    })
})




module.exports = router;