const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.post("/register", userController.register);
router.get("", userController.getAllUsers);
router.post("/savefavouriteprogram", userController.saveFavouriteProgram);
router.get("/programs/:id", userController.getFavouritePrograms);
router.put("/changeusername", userController.changeUsername);
router.delete("/deleteprogram", userController.deleteProgram);
router.post("/savefavouritechannel", userController.saveFavouriteChannel);
router.get("/channels/:id", userController.getFavouriteChannels);
router.delete("/deletechannel", userController.deleteChannel);

module.exports = router;