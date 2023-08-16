const Sport = require("../models/sport");
const asyncHandler = require("express-async-handler");

// Display list of all sports.
exports.sport_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: sport list");
});

// Display detail page for a specific sport.
exports.sport_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: sport detail: ${req.params.id}`);
});

// Display sport create form on GET.
exports.sport_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: sport create GET");
});

// Handle sport create on POST.
exports.sport_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: sport create POST");
});

// Display sport delete form on GET.
exports.sport_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: sport delete GET");
});

// Handle sport delete on POST.
exports.sport_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: sport delete POST");
});

// Display sport update form on GET.
exports.sport_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: sport update GET");
});

// Handle sport update on POST.
exports.sport_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: sport update POST");
});