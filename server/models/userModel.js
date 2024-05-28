const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: { 
        type: String,
        required: [true, 'First name is required'] 
    },
    lastName: { 
        type: String, 
        required: [true, 'Last name is required']
    },
    email: { 
        type: String, 
        required: [true, 'Email is required']
    },
    password: { 
        type: String, 
        required: function() {
            return !this.googleId; // Require password if no Google ID is present
        }
    },
    googleId: {
        type: String,
    }
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel