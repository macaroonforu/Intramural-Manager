const mongoose = require("mongoose")
const Schema = mongoose.Schema; 

const teamSchema = new Schema({
    sport: {type: String, required: true}, 
    coach: { type: Schema.Types.ObjectId, ref: "Coach", required: true }, 
    size: { type: Number, required: true}
})


//Export model 
module.exports = mongoose.model("Team", teamSchema); 