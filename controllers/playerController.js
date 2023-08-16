const Player = require("../models/player");
const asyncHandler = require("express-async-handler");

// Display list of all players.
exports.player_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: player list");
});

// Display detail page for a specific player.
exports.player_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: player detail: ${req.params.id}`);
});

// Display player create form on GET.
exports.player_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: player create GET");
});

// Handle player create on POST.
exports.player_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: player create POST");
});

// Display player delete form on GET.
exports.player_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: player delete GET");
});

// Handle player delete on POST.
exports.player_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: player delete POST");
});

// Display player update form on GET.
exports.player_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: player update GET");
});

// Handle player update on POST.
exports.player_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: player update POST");
});