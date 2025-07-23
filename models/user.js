//this is the simplest version of this model -- there can be much more
//like DOB, address, phone number, etc

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // calling this "validation". Prevents database from acceptin oopsing / backend validation 
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
