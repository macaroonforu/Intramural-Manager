const mongoose = require("mongoose")
const { DateTime } = require("luxon");


const Schema = mongoose.Schema; 

const playerSchema = new Schema({
    team: [{type:  Schema.Types.ObjectId, ref: "Team"}], 
    first_name: { type: String, required: true, maxLength: 20}, 
    family_name: { type: String, required: true, maxLength: 20}, 
    date_of_birth: { type: Date, required: true}, 
    email: { type: String, required: true}, 
    img: {type: String, required: false}, 
}); 
playerSchema.virtual("name").get(function (){
    let fullname =""; 
    if ( this.first_name && this.family_name){
        fullname = `${this.first_name} ${this.family_name}`; 
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
playerSchema.virtual("dob_formatted").get(function (){
    return DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED); 
})
playerSchema.virtual("dob_form").get(function (){
    return DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_SHORT); 
})
playerSchema.virtual("image_path").get(function(){
    return `/images/${this.img}`; 
})

module.exports = mongoose.model("Player", playerSchema); 