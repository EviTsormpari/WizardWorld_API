//This file is used to handle the routes (endpoints) for the houses

const express = require('express');

//Enable router to hadle the endpoints
const router = express.Router();

//Import the controller for the houses
const HouseController = require('../controllers/houses');

//GET METHOD for houses
router.get('/', HouseController.getHouses);
 
//Allow using the router in other files
module.exports = router;