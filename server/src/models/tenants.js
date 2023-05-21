const mongoose = require('mongoose');

// Tenant schema for individual tenants
const tenantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
});

const tenants = mongoose.model('tenants', tenantSchema);

module.exports = tenants;