const mongoose = require('mongoose');

// Building schema for each rental property

const ownerSchema = new mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    properties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'properties' }]
});

const owners = mongoose.model('owners', ownerSchema);

module.exports = owners;