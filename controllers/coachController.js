const Coach = require("../models/coach");
const asyncHandler = require("express-async-handler");


// Display list of all coachs.
exports.coachList = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: coach list");
});

// Display detail page for a specific coach.
exports.coachDetail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: coach detail: ${req.params.id}`);
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

