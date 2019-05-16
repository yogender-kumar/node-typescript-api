import express from "express";

import UserController from "../controllers/user";

let router = express.Router();

router.get("/user/:userId", UserController.getById);
router.get("/user/:userId/avatar", UserController.getAvatarById);
router.delete("/user/:userId/avatar", UserController.deleteAvatarById);

module.exports = router;
