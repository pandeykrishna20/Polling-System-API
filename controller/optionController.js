const Question = require("../models/questionSchema");
const Option = require("../models/optionSchema");

// create option for question using provided id
module.exports.createOption = async (req, resp) => {
  console.log("create Option");

  try {
    let id = req.params.id;
    let question = await Question.findById(id);

    if (question) {
      let option = await Option.create({
        content: req.body.content,
        votes: req.body.votes,
        question: req.params.id,
      });
      // code for votes
      option.link_vote =
        "http://127.0.01:8010/option/" + option.id + "/add_vote";
      option.save();
      question.options.push(option);
      question.save();

      return resp.json({
        option,
        data: {
          message: "option created",
        },
      });
    }
    return resp.json({ question });
  } catch (err) {
    console.log("Error:", err);
  }
};
//adding vote to an option for particular question
module.exports.addVote = async (req, resp) => {
  console.log("add vote");
  try {
    let id = req.params.id;

    // find option if present then vote to it
    await Option.findByIdAndUpdate(id, { $inc: { votes: 1 } });

    return resp.status(200).json({
      data: {
        message: "Voted Successfully",
      },
    });
  } catch (err) {
    return resp.status(500).json({
      data: {
        message: "Internal server error",
      },
    });
  }
};

//delete an option on the basis of its id
module.exports.optionDelete = async (req, resp) => {
  console.log("delete question");
  try {
    let id = req.params.id;
    // check and find option exits or not
    let option = await Option.findById(id);
    console.log(option);

    // if option present then check for vote
    // if option has vote then don't delete
    if (option.votes > 0) {
      return resp.status(404).json({
        data: {
          message: "can't delete! it has vote",
        },
      });
    }

    // delete option from question's array
    await Question.findByIdAndDelete(option.question, {
      $pull: { options: id },
    });
  } catch (err) {
    return resp.status(500).json({
      data: {
        message: "Internal server error",
      },
    });
  }
};
