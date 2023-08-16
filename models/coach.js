const mongoose = require("mongoose")

const Schema = mongoose.Schema; 

const coachSchema = new Schema({
    first_name: {type: String, required: true, maxLength: 100}, 
    family_name: { type: String, required: true, maxLength: 100}, 
    email: { type: String, required: true}

})

module.exports = mongoose.model("Coach", coachSchema); 