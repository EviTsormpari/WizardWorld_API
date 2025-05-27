const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenc = require('dotenv').config(); //to use env variables

//Import routes
const housesRoutes = require('./api/routes/houses');

//Connect to MongoDB Atlas
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}/?retryWrites=true&w=majority&appName=${process.env.MONGO_DB}`)

//Body parser middleware to parse JSON data for POST, PUT and PATCH requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//CORS middleware to allow cross-origin requests
app.use(cors());

app.use('/api/routes/houses', housesRoutes);

//Error handling in the case of a non-existing route
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

//Error handling in all other cases
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;