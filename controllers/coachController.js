const Coach = require("../models/coach");
const asyncHandler = require("express-async-handler");

const coach = require("../models/coach");
const asyncHandler = require("express-async-handler");

// Display list of all coachs.
exports.coach_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: coach list");
});

// Display detail page for a specific coach.
exports.coach_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: coach detail: ${req.params.id}`);
});

// Display coach create form on GET.
exports.coach_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: coach create GET");
});

// Handle coach create on POST.
exports.coach_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: coach create POST");
});

// Display coach delete form on GET.
exports.coach_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: coach delete GET");
});

// Handle coach delete on POST.
exports.coach_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: coach delete POST");
});

// Display coach update form on GET.
exports.coach_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: coach update GET");
});

// Handle coach update on POST.
exports.coach_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: coach update POST");
});