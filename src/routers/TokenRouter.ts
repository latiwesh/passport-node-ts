import express from "express";
import tokenController from "../controllers/TokenController";
const tokenRouter = express.Router();

tokenRouter.route("/token").post(tokenController.authenticateUser);

export default tokenRouter;