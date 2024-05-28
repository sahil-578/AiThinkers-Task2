const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const userModel = require('../models/userModel')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
    
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET_KEY;

passport.use(new JwtStrategy(opts, async (jwt_payload, done) =>{
    try {
        const user = await userModel.findOne({ _id: jwt_payload.id });
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
}));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback',
    scope: ['email','profile']
}, async (token, tokenSecret, profile, done) => {
    try {
        let user = await userModel.findOne({ googleId: profile.id });
        if (!user) {
            user = new userModel({
                googleId: profile.id,
                email: profile.emails[0].value,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName
            });
            await user.save();
        }
        return done(null, user);
    } catch (err) {
        return done(err, false);
    }
}));

// Serialize and deserialize user
passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });