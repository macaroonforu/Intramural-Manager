const Player = require("../models/player");
const Team = require("../models/team"); 
const Sport = require("../models/sport"); 
const Coach = require("../models/coach"); 
const asyncHandler = require("express-async-handler");

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
exports.sportCreateGET = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: sport create GET");
});

// Handle sport create on POST.
exports.sportCreatePOST = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: sport create POST");
});

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


