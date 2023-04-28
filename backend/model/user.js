const mongoose = require("mongoose");
Schema= mongoose.Schema
const userSchema = new Schema({
  email: { type: String, unique: true },
  name: { type: String },
  password: { type: String },
  plan:{type:String}
});

module.exports = mongoose.model("User", userSchema);