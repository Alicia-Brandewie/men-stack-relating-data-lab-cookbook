const express = require("express");
const router = express.Router();
const User = require('../models/user.js');


router.get("/index", async (req, res) =>{
    const currentUser = await User.findById(req.session.user._id);
    const allUsers = await User.find({});
    res.render("allUsers/index.ejs", {
        users: allUsers
    });
});


router.get("/showRecipes/:username", async (req, res) => {
    const currentUser = await User.findById(req.session.user._id);
        const selectedUser = await User.findById(req.params.username);
    res.render('allUsers/showRecipes.ejs', {
        selectedUser: selectedUser
    });
});



module.exports = router;