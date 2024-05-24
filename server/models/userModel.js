const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
    firstName: { 
        type: String, 
        required: [true, 'First Name is required'],
        trim: true 
    },
    lastName: { 
        type: String, 
        required: [true, 'Last Name is required'],
        trim: true 
    },
    email: { 
        type: String, 
        required: [true, 'Email is required'], 
        unique: true,
        trim: true,
        validate: [validator.isEmail, 'Invalid email format'] 
    },
    password: { 
        type: String, 
        validate: {
            validator: function(value) {
              // Password is required if the user doesn't have a Google ID
              return this.googleId || value;
            },
            message: 'Password is required'
        },
        minlength: [6, 'Password must be at least 6 characters long'] 
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    facebookId: {
        type: String,
        unique: true,
        sparse: true
    },
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel