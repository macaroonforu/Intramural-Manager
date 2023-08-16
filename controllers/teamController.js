const Team = require("../models/team");
const asyncHandler = require("express-async-handler");

// Display list of all teams.
exports.team_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: team list");
});

// Display detail page for a specific team.
exports.team_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: team detail: ${req.params.id}`);
});

// Display team create form on GET.
exports.team_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: team create GET");
});

// Handle team create on POST.
exports.team_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: team create POST");
});

// Display team delete form on GET.
exports.team_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: team delete GET");
});

// Handle team delete on POST.
exports.team_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: team delete POST");
});

// Display team update form on GET.
exports.team_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: team update GET");
});

// Handle team update on POST.
exports.team_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: team update POST");
});