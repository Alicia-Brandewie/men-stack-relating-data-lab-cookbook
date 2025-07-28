const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  source: {
    type: String,
  },
  prepTime: {
    type: Number,
  },
  cookTime: {
    type: Number,
  },
  ingredients: {
    type: Array,
    required: true,
  },
  notes: {
    type: String
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // calling this "validation". Prevents database from acceptin oopsing / backend validation 
  },
  password: {
    type: String,
    required: true,
  },
  pantry: [foodSchema]
});

const User = mongoose.model("User", userSchema);

module.exports = User;