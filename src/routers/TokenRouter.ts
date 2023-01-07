import express from "express";
import tokenController from "../controllers/TokenController";
const router = express.Router();

router.route("/token").post(tokenController.authenticateUser);

export default router;