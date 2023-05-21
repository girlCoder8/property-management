const mongoose = require('mongoose');

// Unit schema for each rental unit
const unitSchema = new mongoose.Schema({
    unitName: { type: String, required: true },
    tenant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' },
    status: { type: String, enum: ['vacant', 'occupied'], default: 'vacant' },
    monthlyRent: { type: Number, required: true },
    bedrooms: { type: Number },
    tenant_type: { type: String, default: 'family', enum: ['family', 'bachelor', 'other'] },
    ispaid: { type: Boolean, default: false },
});
