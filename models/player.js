const mongoose = require("mongoose")

const Schema = mongoose.Schema; 

const playerSchema = new Schema({
    team: [{type:  Schema.Types.ObjectId, ref: "Team"}], 
    first_name: { type: String, required: true, maxLength: 20}, 
    family_name: { type: String, required: true, maxLength: 20}, 
    date_of_birth: { type: Date, required: true}, 
    email: { type: String, required: true}, 
}); 
playerSchema.virtual("name").get(function (){
    let fullname =""; 
    if ( this.first_name && this.family_name){
        fullname = `${this.first_name}, ${this.family_name}`; 
    }
    return fullname; 
})
playerSchema.virtual("url").get(function(){
    return `/home/player/${this._id}`; 
})
playerSchema.virtual("mail").get(function(){
    return `mailto:${this.email}`; 
})
playerSchema.virtual("update_url").get(function(){
    return `/home/player/${this._id}/update`; 
})
playerSchema.virtual("delete_url").get(function(){
    return `/home/player/${this._id}/delete`; 
})
module.exports = mongoose.model("Player", playerSchema); 