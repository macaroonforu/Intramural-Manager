const mongoose = require("mongoose")

const Schema = mongoose.Schema; 

const playerSchema = new Schema({
    team: { type:  Schema.Types.ObjectId, ref: "Team", required: true }, 
    first_name: { type: String, required: true, maxLength: 100}, 
    family_name: { type: String, required: true, maxLength: 100}, 
    date_of_birth: { type: Date }, 
    email: { type: String, required: true}, 
}); 

playerSchema.virtual("name").get(function (){
    let fullname =""; 
    if ( this.first_name && this.family_name){
        fullname = `${this.family_name}, ${this.first_name}`; 
    }
    return fullname; 
})

module.exports = mongoose.model("Player", playerSchema); 