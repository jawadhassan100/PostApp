const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  FullName: {
    type: String,
    required: true,
  },
  UserName: {
    type: String,
  },
  Email: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("User", UserSchema);
