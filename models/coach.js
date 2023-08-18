const mongoose = require("mongoose")

const Schema = mongoose.Schema; 

const coachSchema = new Schema({
    first_name: {type: String, required: true, maxLength: 100}, 
    family_name: { type: String, required: true, maxLength: 100}, 
    email: { type: String, required: true}

})

coachSchema.virtual("url").get(function(){
    return `/home/team/${this._id}`; 
});

coachSchema.virtual("name").get(function (){
    let fullname =""; 
    if ( this.first_name && this.family_name){
        fullname = `${this.family_name}, ${this.first_name}`; 
    }
    return fullname; 
})



module.exports = mongoose.model("Coach", coachSchema); 