const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  job: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model("users", UserSchema);
module.exports = userModel;
