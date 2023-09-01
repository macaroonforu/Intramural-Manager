const mongoose = require("mongoose")

const Schema = mongoose.Schema; 

const coachSchema = new Schema({
    first_name: {type: String, required: true, maxLength: 100}, 
    family_name: { type: String, required: true, maxLength: 100}, 
    email: { type: String, required: true}, 
    summary: {type: String, required: false, maxLength: 400}, 
    img: {type: String, required: false}, 
    img_name: {type: String, required: false},
})

coachSchema.virtual("url").get(function(){
    return `/home/coach/${this._id}`; 
});

coachSchema.virtual("name").get(function (){
    let fullname =""; 
    if ( this.first_name && this.family_name){
        fullname = `${this.first_name} ${this.family_name}`; 
    }
    return fullname; 
})

coachSchema.virtual("mail").get(function(){
    return `mailto:${this.email}`; 
})
coachSchema.virtual("update_url").get(function(){
    return `/home/coach/${this._id}/update`; 
})
coachSchema.virtual("delete_url").get(function(){
    return `/home/coach/${this._id}/delete`; 
})
coachSchema.virtual("image_path").get(function(){
    return `/images/${this.img}`
})

module.exports = mongoose.model("Coach", coachSchema); 