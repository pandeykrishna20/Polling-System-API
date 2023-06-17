// const { create } = require("../models/questionSchema");
const Question = require("../models/questionSchema");
const Option = require("../models/optionSchema");

// create question controller
module.exports.createQuestion = async (req, resp) => {
  console.log("create question");

  try {
    let question = await Question.create(req.body);
    if (question) {
      return resp.json({
        question,
        data: { message: "question created successfully" },
      });
    } else {
      return resp.status(500).json({
        message1: "Internal server error",
      });
    }
  } catch (err) {
    console.log(err);
    return;
  }
};

// view question controller
module.exports.viewQuestion = async (req, resp) => {
  // console.log("view question");
  try {
    // populate from questionSchema file
    let question = await Question.findById(req.params.id).populate("options");

    return resp.json({ question });
  } catch (err) {
    return resp.status(500).json({
      data: {
        message: "Internal server error for viewing question",
      },
    });
  }
};

// delete question
/*module.exports.deleteQuestion = async (req, resp) => {
  console.log("delete question");

  try {
    let question = await Question.deleteMany();
    return resp.json({
      message: "all question deleted",
    });
  } catch (err) {
    console.log(err);
  }
};
*/
// Delete question
module.exports.deleteQuestion = async function (req, res) {
  console.log("delete Question");
  try {
    let id = req.params.id;
    let question = await Question.findById(id).populate({
      path: "options",
      select: "votes",
    });

    if (question) {
      let options = question.options;

      for (let i = 0; i < options.length; i++) {
        if (options[i].votes > 0) {
          return res.status(404).json({
            data: {
              message: "question option has some votes, Not Possible to delete",
            },
          });
        }
      }

      await Option.deleteMany({ question: id });
      await Question.findByIdAndDelete(id);

      return res.status(200).json({
        message: "Question deleted successfully",
      });
    } else {
      return res.status(404).json({ message: "Question not found" });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error, deleting question",
    });
  }
};
