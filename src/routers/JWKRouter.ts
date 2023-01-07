import express from "express";
import tokenController from "../controllers/TokenController";
const router = express.Router();

router.route("/jwks.json").get(tokenController.getJWK);

export  default router;