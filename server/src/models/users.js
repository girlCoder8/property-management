const mongoose = require('mongoose');

// User schema for authentication
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'tenant', enum: ['tenant', 'owner'] },
});

const users = mongoose.model('users', userSchema);

module.exports = users;