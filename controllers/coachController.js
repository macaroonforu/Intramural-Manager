const Player = require("../models/player");
const Team = require("../models/team"); 
const Sport = require("../models/sport"); 
const Coach = require("../models/coach"); 
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all coachs.
exports.coachList = asyncHandler(async (req, res, next) => {
  const allCoaches = await Coach.find().exec();
  res.render("coachList", {title: "All Coaches", coach_list: allCoaches}); 
});

// Display detail page for a specific coach.
exports.coachDetail = asyncHandler(async (req, res, next) => {
  const [coach, allTeamsUnderCoach] = await Promise.all([
    Coach.findById(req.params.id).exec(),
    Team.find({ coach: req.params.id}, "name sport").populate("sport").exec(),
  ]); 
  if(coach === null){
    const err = new Error("Coach not found"); 
    err.status = 404; 
    return next(err); 
  }
  res.render("coachDetail",{
    title: "Coach Profile", 
    coach: coach, 
    coach_teams: allTeamsUnderCoach,
  }); 
});

// Display coach create form on GET.
exports.coachCreateGET = (req, res, next) => {
  res.render("coach_form", {title: "Add a Coach"}); 
};

// Handle coach create on POST.
exports.coachCreatePOST = [
  body("email").trim().isLength({ min: 1 }).escape().withMessage("You must enter a contact email").isEmail().withMessage("Invalid Email"),  
  body("first_name").trim().isLength({ min: 1 }).escape().withMessage("You must enter a first name."), 
  body("family_name").trim().isLength({ min: 1 }).escape().withMessage("You must enter a last name."), 
  body("summary").trim().isLength({ min: 1}).escape().withMessage("Please enter a short summary"), 

  asyncHandler(async (req, res, next) =>{
    const errors = validationResult(req); 
    const coach = new Coach({
      email: req.body.email, 
      first_name: req.body.first_name, 
      family_name: req.body.family_name, 
      summary: req.body.summary,  
    }); 
    if(!errors.isEmpty()){
      res.render("coach_form", {
        title:"Invalid Submission Attempt", 
        coach: coach,
        errors: errors.array(), 
      }); 
      return; 
    }
    else{
      await coach.save(); 
      res.redirect(coach.url); 
    }

  }), 
]; 

// Display coach delete form on GET.
exports.coachDeleteGET = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: coach delete GET");
});

// Handle coach delete on POST.
exports.coachDeletePOST = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: coach delete POST");
});

// Display coach update form on GET.
exports.coachUpdateGET = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: coach update GET");
});

// Handle coach update on POST.
exports.coachUpdatePOST = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: coach update POST");
});

