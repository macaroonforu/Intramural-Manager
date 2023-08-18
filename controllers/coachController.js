const Player = require("../models/player");
const Team = require("../models/team"); 
const Sport = require("../models/sport"); 
const Coach = require("../models/coach"); 
const asyncHandler = require("express-async-handler");

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
exports.coachCreateGET = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: coach create GET");
});

// Handle coach create on POST.
exports.coachCreatePOST = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: coach create POST");
});

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

