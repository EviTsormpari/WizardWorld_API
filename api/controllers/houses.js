//This file contains the business logic for the houses endpoints

const axios = require('axios');

//Import the model for the houses
const House = require('../models/houses');

exports.getHouses = async (req, res, next) => {
    
    try{  
        //Check if the database is empty
       if( await House.countDocuments() === 0) { 
            //Call to the API
            const response = await axios.get('https://wizard-world-api.herokuapp.com/houses');
            
            //Insert the houses into the database. Await to wait the database finish inserting all the houses
           await House.insertMany(response.data);

        } 

        //Take the searchTerm (name)
        const name = req.query.name?.trim();

        //If there is a name query find the houses that contain the given name (using regex)
        if(name) {
            // Exclude the __v field from the response
            //Pagination is skipped here to allow searching through all available houses, not just the current page
            const matchedHouses = await House.find({ name: new RegExp(name, 'i') }).select('-__v');

            //if no houses are found, return a 404 error
            if(matchedHouses.length === 0) {
                return res.status(404).json({message: 'House not found'});
            }
            //Return the inserted houses
            res.status(200).json(matchedHouses);
        } else {

            //Use pagination to limit the number of results returned in the case of a large number of houses
            //Use the skip and limit to paginate the results
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 2;
            const skip = (page - 1) * limit;

            //If there is not a name query find all the houses
            // Exclude the __v field from the response
            const insertedHouses = await House.find().select('-__v').skip(skip).limit(limit);
            //Return the inserted houses
            res.status(200).json(insertedHouses);
        }

    } catch (error) {
        //Centralized error handling
        next(error);
    }

};
