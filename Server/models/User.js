const mongoose = require('mongoose');

// User ka data structure define kar rahe hain
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Har email ek hi baar use ho sakta hai
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Is schema ko export kar rahe hain taaki server.js isko use kar sake
module.exports = mongoose.model('User', userSchema);