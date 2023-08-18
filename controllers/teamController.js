const Team = require("../models/team");
const asyncHandler = require("express-async-handler");

// Display list of all teams.
exports.teamList = asyncHandler(async (req, res, next) => {
  const allTeams = await Team.find({}, "name sport size coach").exec(); 
  res.render("teamList", {title: "All Teams", team_list: allTeams})
});

// Display detail page for a specific team.
exports.teamDetail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: team detail: ${req.params.id}`);
});

// Display team create form on GET.
exports.teamCreateGET = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: team create GET");
});

// Handle team create on POST.
exports.teamCreatePOST = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: team create POST");
});

// Display team delete form on GET.
exports.teamDeleteGET = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: team delete GET");
});

// Handle team delete on POST.
exports.teamDeletePOST = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: team delete POST");
});

// Display team update form on GET.
exports.teamUpdateGET = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: team update GET");
});

// Handle team update on POST.
exports.teamUpdatePOST = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: team update POST");
});


