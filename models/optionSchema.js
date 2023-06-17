const mongoose = require("mongoose");
const OptionSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
    votes: {
      type: Number,
    },
    link_vote: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Option = mongoose.model("Option", OptionSchema);
module.exports = Option;
