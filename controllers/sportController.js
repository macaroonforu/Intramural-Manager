const Player = require("../models/player");
const Team = require("../models/team"); 
const Sport = require("../models/sport"); 
const Coach = require("../models/coach"); 
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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
    const sport = new Sport({name: req.body.name }); 
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
  res.send("NOT IMPLEMENTED: sport delete GET");
});

// Handle sport delete on POST.
exports.sportDeletePOST = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: sport delete POST");
});

// Display sport update form on GET.
exports.sportUpdateGET = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: sport update GET");
});

// Handle sport update on POST.
exports.sportUpdatePOST = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: sport update POST");
});


