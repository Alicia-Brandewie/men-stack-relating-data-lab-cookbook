const express = require("express");
const router = express.Router();
const User = require('../models/user.js');

// ----------- router logic ----------//

//GET login 
router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('foods/index.ejs', {
            pantry: currentUser.pantry,
        });
    } catch (error) {
        console.log(error); 
        res.redirect('/');
    }
});

//NEW
router.get('/new', async (req, res) => {
  res.render('foods/new.ejs');
});



//POST/Create New 
router.post('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.pantry.push(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

//SHOW/GET to reveal food.index.ejs 
router.get('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    console.log(currentUser);
    res.render('foods/index.ejs', {
        pantry: currentUser.pantry,
    });
    } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});




module.exports = router;