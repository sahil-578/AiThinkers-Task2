const express = require('express')
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser');
const authRouter = require('./routes/authRoutes.js');

const app = express()

// Middlewares 
app.use(bodyParser.json());

app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))


// Database Connection
const connectDb = require('./config/connectDb.js')


// Routes
app.use('/api/auth', authRouter);


// Global Error Handler
app.use((err, req, res, next) => {
    err.statuCode = err.statuCode || 500;
    err.status = err.status || 'error';

    res.status(err.statuCode).json({
        status : err.status,
        message : err.message
    });

});


// Server
const PORT = process.env.PORT || 5000

connectDb().then(() => {
    app.listen(PORT, ()=> {
        console.log('Server is running at ' + PORT)
    })
})