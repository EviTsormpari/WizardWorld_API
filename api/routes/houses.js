//This file is used to handle the routes (endpoints) for the houses

const express = require('express');

//Enable router to hadle the endpoints
const router = express.Router();

//Import the controller for the houses
const HouseController = require('../controllers/houses');

//GET METHOD for all houses
router.get('/', HouseController.get_allHouses);

//GET METHOD WITH PARAMETER for a house(houses) by name
// router.get('/:name', HouseController.get_houseByName);
 
//Allow using the router in other files
module.exports = router;