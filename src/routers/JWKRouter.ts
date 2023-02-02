import express from "express";
import tokenController from "../controllers/TokenController";
const jwkRouter = express.Router();

jwkRouter.route("/jwks.json").get(tokenController.getJWK);

export  default jwkRouter;