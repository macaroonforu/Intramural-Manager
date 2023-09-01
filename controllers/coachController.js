const Player = require("../models/player");
const Team = require("../models/team"); 
const Sport = require("../models/sport"); 
const Coach = require("../models/coach"); 
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const multer  = require('multer'); 

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
      img: req.file?req.file.originalname:(req.body.existing_image?req.body.existing_image:''),
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
  const [coach, allTeamsUnderCoach] = await Promise.all([
    Coach.findById(req.params.id).exec(), 
    Team.find({ coach: req.params.id }, "name").populate("sport coach name").exec(), 
  ]); 
  if(coach===null){ //When the coach deletes, redirect them to the list of coaches
    res.redirect("/home/coaches"); 
  }
  res.render("coach_delete", {
    title: "Remove A Coach", 
    coach: coach, 
    coach_teams: allTeamsUnderCoach, 
  }); 
});

// Handle coach delete on POST.
exports.coachDeletePOST = asyncHandler(async (req, res, next) => {
  const [coach, allTeamsUnderCoach] = await Promise.all([
    Coach.findById(req.params.id).exec(), 
    Team.find({ coach: req.params.id }, {}).exec(), 
  ]); 
  if (allTeamsUnderCoach.length > 0){
    res.render("coach_delete", {
      title: "Removal Failed", 
      coach: coach, 
      coach_teams: allTeamsUnderCoach, 
    }); 
    return; 
  }
  else{
    await Coach.findByIdAndRemove(req.body.coachid); 
    res.redirect("/home/coaches"); 
  } 
});

// Display coach update form on GET.
exports.coachUpdateGET = asyncHandler(async (req, res, next) => {
  const coach = await Coach.findById(req.params.id).exec(); 
  if(coach===null){
    const err = new Error("Coach not Found"); 
    err.status = 404; 
    return next(err); 
  }
  res.render("coach_form", {
    title: "Update a Coach", 
    coach: coach, 
  }); 
});

// Handle coach update on POST.
exports.coachUpdatePOST = [
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
      img: req.file?req.file.originalname:(req.body.existing_image?req.body.existing_image:''),
      _id: req.params.id,  
    }); 
    if(!errors.isEmpty()){
      res.render("coach_form", {
        title:"Invalid Submission Attempt, Correct Errors and Try Again", 
        coach: coach,
        errors: errors.array(), 
      }); 
      return; 
    }
    else{
      const updatedCoach = await Coach.findByIdAndUpdate(req.params.id, coach, {}); 
      res.redirect(updatedCoach.url); 
    }
  }), 
]; 

