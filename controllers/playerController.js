const Player = require("../models/player");
const Team = require("../models/team"); 
const Sport = require("../models/sport"); 
const Coach = require("../models/coach"); 
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  const [numPlayers, numCoaches, numTeams, numSports] = 
  await Promise.all([
    Player.countDocuments({}).exec(), 
    Coach.countDocuments({}).exec(), 
    Team.countDocuments({}).exec(), 
    Sport.countDocuments({}).exec(), 
  ]); 
  res.render("index", {
    title: "Intramural Manager Home", 
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
  res.send("NOT IMPLEMENTED: player create GET");
});

// Handle player create on POST.
exports.playerCreatePOST = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: player create POST");
});

// Display player delete form on GET.
exports.playerDeleteGET = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: player delete GET");
});

// Handle player delete on POST.
exports.playerDeletePOST = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: player delete POST");
});

// Display player update form on GET.
exports.playerUpdateGET = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: player update GET");
});

// Handle player update on POST.
exports.playerUpdatePOST = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: player update POST");
});