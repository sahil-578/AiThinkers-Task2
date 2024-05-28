const userModel = require('../models/userModel');
const { hashSync, compareSync } = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('../config/passport')
require('dotenv').config()

// Register a User

exports.register = async (req, res, next) => {
    const user = new userModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashSync(req.body.password, 10)
    })

    user.save().then(user => {
        res.send({
            success: true,
            message: "User created successfully.",
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        })
    }).catch(err => {
        res.send({
            success: false,
            message: "Something went wrong",
            error: err
        })
    })
  }
  
  
// Logging a User
  
exports.login = async(req, res, next) => {
    userModel.findOne({ email: req.body.email }).then(user => {
        //No user found
        if (!user) {
            return res.status(401).send({
                success: false,
                message: "Could not find the user."
            })
        }

        //Incorrect password
        if (!compareSync(req.body.password, user.password)) {
            return res.status(401).send({
                success: false,
                message: "Incorrect password"
            })
        }

        const payload = {
            email: user.email,
            id: user._id
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })

        return res.status(200).send({
            success: true,
            message: "Logged in successfully!",
            token
        })
    })    
}


// Google OAuth callback
exports.google = passport.authenticate('google', { scope: ['profile', 'email'] })

exports.googleCallback = async (req, res) => {
    const payload = {
        email: req.user.email,
        id: req.user._id
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
    console.log("Generated Token:", token);
    // Redirect or respond with the token
    res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=${token}`);
};