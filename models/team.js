const mongoose = require("mongoose")
const Schema = mongoose.Schema; 

const teamSchema = new Schema({
    name: {type: String, required: true}, 
    sport: {type: Schema.Types.ObjectId, ref:"Sport", required: true}, 
    coach: { type: Schema.Types.ObjectId, ref: "Coach", required: true }, 
    size: { type: Number, required: true}
})
teamSchema.virtual("url").get(function(){
    return `/home/team/${this._id}`; 
})

//Export model 
module.exports = mongoose.model("Team", teamSchema); 