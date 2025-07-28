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
      addedRecipe: recipe,
    });
    } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});



// ---------------------- UPDATE ---------------------//
//GET_ added recipe to update it
router.get('/:pantryId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const pantry = currentUser.pantry.id(req.params.pantryId);
    res.render('foods/edit.ejs', {
      addedRecipe: pantry,
   });              
    console.log("hit edit button");

  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


//PUT_edited recipe into DB
router.put('/:pantryID', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const pantry = currentUser.pantry.id(req.params.pantryID);
    pantry.set(req.body);
    await currentUser.save();
    res.redirect(
      `/users/${currentUser._id}/foods/${req.params.pantryID}`
    );
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// ---------------------- DELETE ---------------------//
//first attempt
// router.delete('/:foodId', async (req,res) => {
//     console.log("deleteHit")
//     try { 
//     const currentUser = await User.findById(req.session.user._id);
//     console.log(currentUser)
//     currentUser.pantry.id(req.params.pantryId).deleteOne();
//     await currentUser.save();
//     res.redirect(`/users/${currentUser._id}/foods`);
//     } catch (error) {
//         console.log(error);
//         res.redirect('/');
//     }
// });

//DELETE_delete added Recipe
//help from Glen (also applicable to other CRUD areas), "mongo being mongo"
router.delete('/:pantryId', async (req, res) => {
  // console.log("deleteHit");
  try {
    const currentUser = await User.findById(req.session.user._id);
   // console.log(currentUser);

    // Filter out the item with the matching ID
    currentUser.pantry = currentUser.pantry.filter(item => item._id.toString() !== req.params.pantryId);

    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});
module.exports = router;





