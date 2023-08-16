const mongoose = require("mongoose"); 

const Schema = mongoose.Schema; 

const sportSchema = new Schema({
    name: { type: String, min: 3, max: 20, required: true}, 
}); 

module.exports = mongoose.model("Sport", sportSchema); 