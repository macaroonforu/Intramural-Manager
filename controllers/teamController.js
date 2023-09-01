const Player = require("../models/player");
const Team = require("../models/team"); 
const Sport = require("../models/sport"); 
const Coach = require("../models/coach"); 
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all teams.
exports.teamList = asyncHandler(async (req, res, next) => {
  const allTeams = await Team.find({}, "name sport size coach").exec(); 
  res.render("teamList", {title: "All Teams", team_list: allTeams})
});

// Display detail page for a specific team.
exports.teamDetail = asyncHandler(async (req, res, next) => {
  const[team, allPlayersUnderTeam] = await Promise.all(
    [Team.findById(req.params.id).populate("coach sport").exec(), 
    Player.find({team: req.params.id}).exec()]
  ); 
  if(team === null){
    const err = new Error("Team not found"); 
    err.status = 404; 
    return next(err); 
  }
  res.render("teamDetail",{
    title: "Team Profile", 
    team: team, 
    team_players: allPlayersUnderTeam,
  }); 
});

// Display team create form on GET.
exports.teamCreateGET = asyncHandler(async (req, res, next) => {
    const[allCoaches, allSports] = await Promise.all([
      Coach.find().exec(), 
      Sport.find().exec(),
    ]); 
  res.render("team_form", {
    title: "Add a Team", 
    coaches: allCoaches, 
    sports: allSports, 
  }); 
});

// Handle team create on POST.
exports.teamCreatePOST = [
  //Just really sanitizing the data: validation was not necessary 
  body("name").trim().escape(),
  body("coach").trim().escape(), 
  body("size").trim().escape(), 
  body("sport").trim().escape(), 

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req); 
    const team = new Team({
      name: req.body.name, 
      coach: req.body.coach, 
      sport: req.body.sport, 
      size: req.body.size, 
      img: req.file?req.file.originalname:(req.body.existing_image?req.body.existing_image:''),
    }); 

    if(!errors.isEmpty()){
      const[allCoaches, allSports] = await Promise.all([
        Coach.find().exec(), 
        Sport.find().exec(),
      ]); 
      res.render("team_form", {
        title: "Invalid Submission Attempt", 
        coaches: allCoaches, 
        sports: allSports, 
        team: team, 
        errors:errors.array(), 
      }); 
    }
    else{
      await team.save(); 
      res.redirect(team.url); 
    }
  }), 
]; 

// Display team delete form on GET.
exports.teamDeleteGET = asyncHandler(async (req, res, next) => {
  const[team, allPlayersUnderTeam] = await Promise.all(
    [Team.findById(req.params.id).populate("coach sport").exec(), 
    Player.find({team: req.params.id}).exec()]
  ); 
  if (team === null){
    res.redirect("/home/teams"); 
  }
  res.render("team_delete", {
    title: "Remove a Team", 
    team: team, 
    team_players: allPlayersUnderTeam, 
  }); 
});

// Handle team delete on POST.
exports.teamDeletePOST = asyncHandler(async (req, res, next) => {
  const[team, allPlayersUnderTeam] = await Promise.all(
    [Team.findById(req.params.id).populate("coach sport").exec(), 
    Player.find({team: req.params.id}).exec()]
  );
  if(allPlayersUnderTeam.length > 0){
    res.render("team_delete", {
      title: "Removal Failed", 
      team: team, 
      team_players: allPlayersUnderTeam, 
    }); 
    return;
  }
  else{
    await Team.findByIdAndRemove(req.body.teamid); 
    res.redirect("/home/teams"); 
  }
});

// Display team update form on GET.
exports.teamUpdateGET = asyncHandler(async (req, res, next) => {
  const [team, allCoaches, allSports] = await Promise.all([
    Team.findById(req.params.id).populate("coach sport").exec(), 
    Coach.find(), 
    Sport.find(), 
  ]); 
  if (team === null) {
    const err = new Error("Team not found");
    err.status = 404;
    return next(err);
  }
  res.render("team_form", {
    title: "Update a team", 
    team: team, 
    sports: allSports, 
    coaches: allCoaches, 
  })

});

// Handle team update on POST.
exports.teamUpdatePOST = [
  //Just really sanitizing the data: validation was not necessary 
  body("name").trim().escape(),
  body("coach").trim().escape(), 
  body("size").trim().escape(), 
  body("sport").trim().escape(), 

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req); 
    const team = new Team({
      name: req.body.name, 
      coach: req.body.coach, 
      sport: req.body.sport, 
      size: req.body.size, 
      img: req.file?req.file.originalname:(req.body.existing_image?req.body.existing_image:''), 
      _id: req.params.id, 
    }); 

    if(!errors.isEmpty()){
      const[allCoaches, allSports] = await Promise.all([
        Coach.find().exec(), 
        Sport.find().exec(),
      ]); 
      res.render("team_form", {
        title: "Invalid Submission Attempt, please correct errors and try again", 
        coaches: allCoaches, 
        sports: allSports, 
        team: team, 
        errors:errors.array(), 
      }); 
    }
    else{
      const updatedTeam = await Team.findByIdAndUpdate(req.params.id, team, {}); 
      res.redirect(updatedTeam.url); 
    }
  }), 
]; 

