const express = require('express');
const router = express.Router();

/* GET home page. */
router.get("/", function(req, res) {
  res.redirect("/home"); 
});

module.exports = router; 


