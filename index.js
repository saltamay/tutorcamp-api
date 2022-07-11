import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import colors from 'colors';

import { bootcamps } from './src/routes/bootcamps.route.js';
// import { createConnection } from 'mongoose';
import { connectDatabase } from './src/database/index.js';
import { isDevelopment } from './src/utils/index.js';

const PORT = process.env.PORT || 8001;

export const createApp = () => {
  const app = express();

  if (isDevelopment()) app.use(morgan('dev'));

  app.use(express.json());
  app.use('/api/v1/bootcamps', bootcamps);

  return app;
};

const app = createApp();

connectDatabase().catch((err) => console.log(`[err]: ${err.message}`.red));

app.listen(PORT, console.log(`[app]: http://localhost:${PORT}`.yellow.bold));
