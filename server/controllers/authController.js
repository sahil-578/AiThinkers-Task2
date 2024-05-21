const User = require('../models/userModel');
const creatError = require('../utils/appError')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Register a User

exports.signup = async (req, res, next) => {
  try {
    const user = await User.findOne({ email : req.body.email });
    
    if (user) {
        return next(new creatError('User already exists !', 400));
    }

    const hashedPassword = await bcrypt.hash(req.body.password,12);

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    // Assign JWT to a user

    const token = jwt.sign(
      {_id: newUser._id}, 
      process.env.JWT_SECRET_KEY, 
      {expiresIn : '30d'});

      res.status(201).json({
        message : "User Registered successfully",
        token,
        status: 'success'
    })

  }
  catch(error){
    next(error);
  }
}


// Logging a User

exports.login = async(req, res, next) => {
  try{
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(!user) return next(new creatError('User not found !', 404))

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
      return next(new creatError('Invalid email or password !', 401));
    }

    const token = jwt.sign(
      {_id: user._id}, 
      process.env.JWT_SECRET_KEY, 
      {expiresIn : '30d'});

      res.status(200).json({
        message : "User logged-in successfully",
        token,
        status: 'success',
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName : user.lastName,
          email: user.email,
        }
    })
  }
  catch(error){
    next(error);
  }
}