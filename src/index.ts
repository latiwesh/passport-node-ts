const dotenv = require('dotenv');
dotenv.config();
const express = require ("express");
import { json } from "express";
import cors from "cors";
import tokenRouter from "./routers/TokenRouter";
import jwkRouter from "./routers/JWKRouter";
import config from "./config/config"

const app = express();
app.use(cors())
app.use(json())
app.use("/api/v1", tokenRouter);
app.use("/.well-known", jwkRouter);

const port = config.PORT | 8084;


app.listen(process.env.PORT, () => {
    console.log(`app is running and listening on port: ${port}`);
});