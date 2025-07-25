const express = require("express");
const router = express.Router();
const User = require('../models/user.js');

// ----------- router logic ----------//

router.get('/', (req, res) => {
  res.render('foods/index.ejs');
});

moddule.exports = router;