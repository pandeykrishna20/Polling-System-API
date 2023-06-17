const express = require("express");
const questionController = require("../controller/questionController");
// create a new router objects
const router = express.Router();

router.post("/create", questionController.createQuestion);

router.get("/:id/view", questionController.viewQuestion);

router.delete("/:id/delete", questionController.deleteQuestion);

module.exports = router;
