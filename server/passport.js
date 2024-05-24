const GoogleStrategy = require('passport-google-oauth20').Strategy
const passport = require('passport')
const User = require('./models/userModel')

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback',
    scope: ['profile', 'email']
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            // Check if user already exists in your database
            let user = await User.findOne({ googleId: profile.id });

            if (!user) {
                // Create new user if not found
                user = await User.create({
                    googleId: profile.id,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    email: profile.emails[0].value
                });
            }


            // Pass the user object to serialize/deserialize functions
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));


// Facebook Strategy

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: '/api/auth/facebook/callback',
    profileFields: ['id', 'name', 'email']
},
    async (accessToken, refreshToken, profile, done) => {
        try {

            console.log('Facebook Profile', profile)

            let user = await User.findOne({
                facebookId: profile.id,
            });

            if (!user) {
                user = await User.create({
                    facebookId: profile.id,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    email: profile.emails ? profile.emails[0].value : null,

                });
            }

            return done(null, user);
        } catch (error) {
            return done(error, false, { message: 'Something went wrong' });
        }
    }
));


// Serialize and deserialize user
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});