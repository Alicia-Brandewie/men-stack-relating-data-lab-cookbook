const express = require("express");
const router = express.Router();
const User = require('../models/user.js');

// ---------------------- CREATE ---------------------//
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

// ---------------------- READ ---------------------//
//GET _ login page
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

//GET _new page
router.get('/new', async (req, res) => {
  res.render('foods/new.ejs');
});





//GET_to reveal food.index.ejs 
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

//GET_to recipe.ejs
router.get('/:foodId', async (req, res) => {
// res.send(`here is your request param: ${req.params.foodId}`);

     try{
    const currentUser = await User.findById(req.session.user._id);
    const recipe = currentUser.pantry.id(req.params.foodId);
    res.render('foods/recipe.ejs', {
      banana: recipe,
    });
    } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});



// ---------------------- UPDATE ---------------------//


// ---------------------- DELETE ---------------------//


module.exports = router;