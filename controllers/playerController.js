const Player = require("../models/player");
const Team = require("../models/team"); 
const Sport = require("../models/sport"); 
const Coach = require("../models/coach"); 
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const fs = require('fs');
const path = require('path'); 
function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}

exports.index = asyncHandler(async (req, res, next) => {
  const [numPlayers, numCoaches, numTeams, numSports] = 
  await Promise.all([
    Player.countDocuments({}).exec(), 
    Coach.countDocuments({}).exec(), 
    Team.countDocuments({}).exec(), 
    Sport.countDocuments({}).exec(), 
  ]); 
  res.render("index", {
    title: "Intramural Manager", 
    team_count: numTeams, 
    player_count: numPlayers, 
    coach_count: numCoaches, 
    sport_count: numSports, 
  }); 
});

// Display list of all players.
exports.playerList = asyncHandler(async (req, res, next) => {
  const allPlayers = await Player.find().exec();
  res.render("playerList", {title: "All Players", player_list: allPlayers}); 
});

// Display detail page for a specific player.
exports.playerDetail = asyncHandler(async (req, res, next) => {
  const player = await Player.findById(req.params.id).populate("team").exec(); 
  const teams = []
  for(let i =0;  i < player.team.length; i++){
    const team = await Team.findById(player.team[i]).exec(); 
    teams[i] = team; 
  }
  res.render("playerDetail", {
    title: "Player Profile", 
    player: player, 
    player_teams: teams, 
  }); 
}); 

// Display player create form on GET.
exports.playerCreateGET = asyncHandler(async (req, res, next) => {
  const allTeams = await Team.find().exec(); 
  res.render("player_form", {
    teams: allTeams, 
    title: "Add a Player", 
  }); 
});

// Handle player create on POST.
exports.playerCreatePOST = [
   // Convert the associated teams to an array.
   (req, res, next) => {
    if (!(req.body.team instanceof Array)) {
      if (typeof req.body.team === "undefined") {
        req.body.team = [];
      }
      else{
        req.body.team = new Array(req.body.team);
      } 
    }
    next();
  },
  //Validate and sanitize the form data
  body("email").trim().isLength({ min: 1 }).escape().withMessage("You must enter a contact email").isEmail().withMessage("Invalid Email"),  
  body("first_name").trim().isLength({ min: 1 }).escape().withMessage("You must enter a first name."), 
  body("family_name").trim().isLength({ min: 1 }).escape().withMessage("You must enter a last name."), 
  body("date_of_birth", "Invalid date of birth").isISO8601().toDate(),
 

  asyncHandler(async (req, res, next) =>{
    const errors = validationResult(req); 
    const __parentDir = path.join(__dirname, '../.');
    const image_name = req.file?req.file.originalname:(req.body.existing_image?req.body.existing_image:''); 
    const base64str = image_name?base64_encode(path.join(__parentDir + `/public/images/${image_name}`)):'';
    const src = base64str?'data:image;base64,' + base64str:'';
    const player = new Player({
      team: req.body.team, 
      first_name: req.body.first_name, 
      family_name: req.body.family_name, 
      date_of_birth: req.body.date_of_birth, 
      email: req.body.email, 
      img: src,
      img_name: image_name, 
    }); 

    if(!errors.isEmpty()){
      const allTeams = await Team.find().exec(); 
      for (const team of allTeams) {
        if (player.team.includes(team._id)) {
          team.checked = "true";
        }
      }

      res.render("player_form", {
        teams: allTeams, 
        title: "Invalid Submission Attempt", 
        player: player, 
        errors: errors.array(), 
      }); 
      return; 
    }
    else{
      await player.save(); 
      res.redirect(player.url); 
    }
  }),  
]; 

// Display player delete form on GET.
exports.playerDeleteGET = asyncHandler(async (req, res, next) => {
  const player = await Player.findById(req.params.id); 
  if (player === null){
    res.redirect("/home/players"); 
  }
  res.render("player_delete", {
    title: "Remove a Player", 
    player: player,
  }); 
});

// Handle player delete on POST.
exports.playerDeletePOST = asyncHandler(async (req, res, next) => {
  await Player.findByIdAndRemove(req.body.playerid); 
  res.redirect("/home/players"); 
});

// Display player update form on GET.
exports.playerUpdateGET = asyncHandler(async (req, res, next) => {
  const [player, allTeams]= await Promise.all([
    Player.findById(req.params.id).populate("team").exec(), 
    Team.find().exec(), 
  ]); 

  if (player === null) {
    const err = new Error("Player not found");
    err.status = 404;
    return next(err);
  }
  for(const team of allTeams){
    for (const playerTeam of player.team){
      if(team._id.toString() === playerTeam._id.toString()){
        team.checked="true"; 
      }
    } 
  }
  res.render("player_form", {
    title: "Update Player", 
    player: player, 
    teams: allTeams, 
  }); 
});

// Handle player update on POST.
exports.playerUpdatePOST = [
  (req, res, next) => {
    if(!(req.body.team instanceof Array)){
      if(typeof req.body.team === "undefined"){
        req.body.team = []; 
      }
      else{
        req.body.team = new Array(req.body.team); 
      }
    }
    next(); 
  },

  //Validate and sanitize the form data
  body("email").trim().isLength({ min: 1 }).escape().withMessage("You must enter a contact email").isEmail().withMessage("Invalid Email"),  
  body("first_name").trim().isLength({ min: 1 }).escape().withMessage("You must enter a first name."), 
  body("family_name").trim().isLength({ min: 1 }).escape().withMessage("You must enter a last name."), 
  body("date_of_birth", "Invalid date of birth").isISO8601().toDate(),
 

  asyncHandler(async (req, res, next) =>{
    const errors = validationResult(req);
    const __parentDir = path.join(__dirname, '../.');
    const image_name = req.file?req.file.originalname:(req.body.existing_image?req.body.existing_image:''); 
    const base64str = image_name?base64_encode(path.join(__parentDir + `/public/images/${image_name}`)):'';
    const src = base64str?'data:image;base64,' + base64str:''; 
    const player = new Player({
      team: typeof req.body.team === "undefined"? [] : req.body.team, 
      first_name: req.body.first_name, 
      family_name: req.body.family_name, 
      date_of_birth: req.body.date_of_birth, 
      email: req.body.email, 
      img: src,
      img_name: image_name, 
      _id: req.params.id, 
    }); 

    if(!errors.isEmpty()){
      const [player, allTeams]= await Promise.all([
        Player.findById(req.params.id).populate("team").exec(), 
        Team.find().exec(), 
      ]); 

      for(const team of allTeams){
        for (const playerTeam of player.team){
          if(team._id.toString() === playerTeam._id.toString()){
            team.checked="true"; 
          }
        } 
      }
      res.render("player_form", {
        teams: allTeams, 
        title: "Invalid Submission Attempt", 
        player: player, 
        errors: errors.array(), 
      }); 
      return; 
    }
    else{
      const updatedPlayer = await Player.findByIdAndUpdate(req.params.id, player, {}); 
      res.redirect(updatedPlayer.url); 
    }
  }),  
]; 