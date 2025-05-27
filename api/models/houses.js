const mongoose = require('mongoose');

//Heads and traits are arrays of json objects. So we need to define the schema for them
const headSchema = new mongoose.Schema({
    id: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
});

const traitSchema = new mongoose.Schema({
    id: {type: String, required: true},
    name: {type: String, required: true}
});


//Define the schema for the houses. This schema has strong validation rules.
//However it is very easy to change the schema if needed.
const houseSchema = new mongoose.Schema({
    id: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    houseColours: {type: String, required: true},
    founder: {type: String, required: true},
    animal: {type: String, required: true},
    element: {type: String, required: true},
    ghost: {type: String, required: true},
    commonRoom: {type: String, required: true},
    heads: [headSchema],
    traits: [traitSchema]
});


//Create the model for the houses to build objects from the schema
module.exports = mongoose.model('House', houseSchema);