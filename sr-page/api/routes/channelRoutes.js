const express = require("express");
const router = express.Router();
const channelController = require("../controllers/channelController");

router.get("", channelController.getAllChannels);
router.get("/categories", channelController.getAllCategories);
router.get("/programs/:id", channelController.getPrograms);
router.get("/programs", channelController.getAllPrograms);
router.get("/categories/:id", channelController.getSelectedCategories);

module.exports = router;