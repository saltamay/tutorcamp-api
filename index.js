import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import colors from 'colors';

import { connectDatabase } from './src/database/index.js';
import { isDevelopment } from './src/utils.js';
import { bootcamps } from './src/routes/bootcamps.route.js';

const PORT = process.env.PORT || 8001;

const mount = async (app) => {
  connectDatabase().catch((err) => console.log(`[err]: ${err.message}`.red));

  if (isDevelopment()) app.use(morgan('dev'));

  app.use(express.json());
  app.use('/api/v1/bootcamps', bootcamps);

  app.listen(PORT, console.log(`[app]: http://localhost:${PORT}`.yellow.bold));
};

mount(express());
