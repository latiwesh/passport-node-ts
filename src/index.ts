const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
import tokenRouter from './routers/TokenRouter';
import jwkRouter from './routers/JWKRouter';
import sanitizedConfig from './config/config';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1', tokenRouter);
app.use('/.well-known', jwkRouter);

const port = sanitizedConfig.PORT | 8084;

app.listen(process.env.PORT, () => {
  console.log(`app is running and listening on port: ${port}`);
});
