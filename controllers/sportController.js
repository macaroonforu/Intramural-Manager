const Player = require("../models/player");
const Team = require("../models/team"); 
const Sport = require("../models/sport"); 
const Coach = require("../models/coach"); 
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const fs = require('fs');
const path = require('path'); 
//const { image_data } = require("../test"); 


// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

// Display list of all sports.
exports.sportList = asyncHandler(async (req, res, next) => {
  const allSports = await Sport.find({}, "name").exec(); 
  res.render("sportList", {title:"All Sports", sport_list:allSports}); 
});

// Display detail page for a specific sport.
exports.sportDetail = asyncHandler(async (req, res, next) => {
  
  const [sport, allTeamsUnderSport] = await Promise.all([
    Sport.findById(req.params.id).exec(), 
    Team.find({sport: req.params.id}).exec(), 
  ]); 
  if(sport === null){
    const err = new Error("Sport not found"); 
    err.status = 404; 
    return next(err); 
  }
  res.render("sportDetail",{
    title: "Sport Profile", 
    sport: sport, 
    sport_teams: allTeamsUnderSport,
  }); 
});
// Display sport create form on GET.
exports.sportCreateGET = (req, res, next) => {
  res.render("sport_form", {title: "Add a Sport"}); 
};

// Handle sport create on POST.
exports.sportCreatePOST = [
  //Validate and sanitize the name field 
  body("name").trim().isLength({ min: 3 }).escape().withMessage( "Sport must contain at least 3 characters."), 
  body("name").trim().isLength({ max: 20 }).escape().withMessage( "Sport must contain no more than 20 characters."), 
  asyncHandler(async (req, res, next) =>{
    //Extract the validation errors from a request. 
    const errors = validationResult(req); 
    //Create a sport object with the escaped and trimmed data. 
    const sport = new Sport({name: req.body.name, img: req.file?req.file.originalname:(req.body.existing_image?req.body.existing_image:''),}); 
    if(!errors.isEmpty()){
      res.render("sport_form", {
        title: "Invalid Submission Attempt", 
        sport: sport, 
        errors: errors.array(), 
      }); 
      return; 
    }
    else{
      const sportExists = await Sport.findOne({name: req.body.name}).exec(); 
      if (sportExists){
        res.redirect(sportExists.url); 
      }
      else{
        await sport.save(); 
        res.redirect(sport.url); 
      }
    }
  }), 
]; 

// Display sport delete form on GET.
exports.sportDeleteGET = asyncHandler(async (req, res, next) => {
  const [sport, allTeamsUnderSport] = await Promise.all([
    Sport.findById(req.params.id).exec(), 
    Team.find({sport: req.params.id }, "name").populate("sport coach name").exec(), 
  ]); 
  if (sport === null){
    res.redirect("/home/sports"); 
  }
  res.render("sport_delete", {
    title: "Remove a Sport", 
    sport: sport, 
    sport_teams: allTeamsUnderSport, 
  }); 
});

// Handle sport delete on POST.
exports.sportDeletePOST = asyncHandler(async (req, res, next) => {
  const [sport, allTeamsUnderSport] = await Promise.all([
    Sport.findById(req.params.id).exec(), 
    Team.find({sport: req.params.id }, "name").populate("sport coach name").exec(), 
  ]); 
  if (allTeamsUnderSport.length > 0){
    res.render("sport_delete", {
      title: "Removal Failed", 
      sport: sport, 
      sport_teams: allTeamsUnderSport, 
    }); 
    return; 
  }
  else{
    await Sport.findByIdAndRemove(req.body.sportid); 
    res.redirect("/home/sports"); 
  }
});

// Display sport update form on GET.
exports.sportUpdateGET = asyncHandler(async (req, res, next) => {
  const sport = await Sport.findById(req.params.id).exec(); 
  if(sport===null){
    const err = new Error("Sport not Found"); 
    err.status = 404; 
    return next(err); 
  }
  res.render("sport_form", {
    title: "Update A Sport", 
    sport: sport, 
  }); 
});

// Handle sport update on POST.
exports.sportUpdatePOST = [
  body("name").trim().isLength({ min: 3 }).escape().withMessage( "Sport must contain at least 3 characters."), 
  body("name").trim().isLength({ max: 20 }).escape().withMessage( "Sport must contain no more than 20 characters."), 
  asyncHandler(async (req, res, next) =>{
    //Extract the validation errors from a request. 
    const errors = validationResult(req); 
    const __parentDir = path.join(__dirname, '../.');
    const image_name = req.file?req.file.originalname:(req.body.existing_image?req.body.existing_image:''); 
    const base64str = image_name?base64_encode(path.join(__parentDir + `/public/images/${image_name}`)):'';
    const src = base64str?'data:image;base64,' + base64str:'';

    //const [src, image_name] = image_data(req); 

    const sport = new Sport({
      name: req.body.name, 
      img: src,  
      img_name: image_name,
      _id: req.params.id,
    }); 
    if(!errors.isEmpty()){
      res.render("sport_form", {
        title: "Invalid Submission Attempt, Correct Errors and Try Again", 
        sport: sport, 
        errors: errors.array(), 
      }); 
    }
    else{
      /*const sportExists = await Sport.findOne({name: req.body.name}).exec(); 
      if (sportExists){
        res.redirect(sportExists.url); 
      }*/
      const updatedSport = await Sport.findByIdAndUpdate(req.params.id, sport, {}); 
      res.redirect(updatedSport.url); 
    }
  }), 
]; 


