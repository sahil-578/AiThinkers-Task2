const express = require('express')
const cors = require('cors')
require('dotenv').config()
const authRouter = require('./routes/authRoutes.js');
const passport = require('passport');

require('./config/passport.js')

const session = require('express-session')

const app = express()

// Middlewares 
app.use(express.json());

app.use(express.urlencoded({ extended: true }))

app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(session({
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : true,
    cookie : {
        maxAge : 1000*60*60*24
    }, 
}));

app.use(passport.initialize());
app.use(passport.session());


// Database Connection
const connectDb = require('./config/connectDb.js')


// Routes
app.use('/api/auth', authRouter);

console.log("Frontend Url", process.env.FRONTEND_URL);

app.get('/dashboard', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log("Authenticated User:", req.user); // Log the authenticated user
    return res.status(200).send({
        success: true,
        user: {
            id: req.user._id,
            email: req.user.email,
        }
    })
})


// Server
const PORT = process.env.PORT || 5000

connectDb().then(() => {
    app.listen(PORT, ()=> {
        console.log('Server is running at ' + PORT)
    })
})