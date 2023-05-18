const mongoose = require("mongoose");
const PostSchema = mongoose.Schema(
  {
    Title: {
      type: String,
    },
    Content: {
      type: String,
    },
    UserId: {
      type: String,
    },
    Author: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Post", PostSchema);
