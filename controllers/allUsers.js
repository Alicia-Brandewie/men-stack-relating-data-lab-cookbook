const express = require("express");
const router = express.Router();
const User = require('../models/user.js');


router.get("/index", async (req, res) =>{
    const currentUser = await User.findById(req.session.user._id);
    console.log('clicked community page');
    res.render("allUsers/index.ejs");
});

// router.post('/index', async (req,res) =>{
//     const userInDatabase = await User.findOne({username: req.body.username});
//     if (userInDatabase) {
//         return res.send("Username already taken");
//     }

//     if (req.body.password !== req.body.confirmPassword){
//         return res.send("Password and confirm Password must match");
//     }

//     const hashedPassword = bcrypt.hashSync(req.body.password, 10);
//         req.body.password = hashedPassword;

//     const user = await User.create(req.body);

//     res.send(`Thanks for signing up ${user.username}`);
// })



module.exports = router;