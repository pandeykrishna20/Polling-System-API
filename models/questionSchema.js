const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    options: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Option",
      },
    ],
  },
  {
    timestamps: true,
  }
);
const question = mongoose.model("question", questionSchema);
module.exports = question;
