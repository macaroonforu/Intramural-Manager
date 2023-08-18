const mongoose = require("mongoose"); 

const Schema = mongoose.Schema; 

const sportSchema = new Schema({
    name: { type: String, min: 3, max: 20, required: true}, 
}); 
sportSchema.virtual("url").get(function(){
    return `/home/sport/${this._id}`; 
})

module.exports = mongoose.model("Sport", sportSchema); 