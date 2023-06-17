const express = require("express");

const router = express.Router();
const optionController = require("../controller/optionController");

router.post("/:id/create_option", optionController.createOption);

router.get("/option/:id/add_vote", optionController.addVote);
router.delete("/:id/delete", optionController.optionDelete);

module.exports = router;
