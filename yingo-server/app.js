const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require("./mongo")
const rateLimit = require("express-rate-limit");

const whitelist = [`https://yingo.pages.dev`];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}
// Enable rate limiting
const apiLimiter = rateLimit({
    windowMs: process.env.WINDOWMS, 
    max: process.env.MAX,
    message: "Too many requests from this IP. Please try again later."
 });

require('dotenv').config();

// Load the routes
const bingoRoutes = require('./routes/bingoRoutes');

// Use the routes
app.use(cors(corsOptions));
app.use(express.json());
app.use('/', apiLimiter);
app.use('/', bingoRoutes);
app.set('trust proxy', 1); 

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

mongoose.init();
