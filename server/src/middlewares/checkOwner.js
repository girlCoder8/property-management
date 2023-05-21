const checkOwner = (req, res, next) => {
    if (req.session.isOwner) {
        next()
    }
    else {
        res.status(401).send("Only Owners are authorized")
    }
}

module.exports = checkOwner;