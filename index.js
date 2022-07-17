import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import colors from 'colors';

import { bootcampsRouter } from './src/routes/bootcamps.route.js';
import { coursesRouter } from './src/routes/courses.route.js';
import { connectDatabase } from './src/database/index.js';
import { isDevelopment } from './src/utils/index.js';
import { errorHandler } from './src/middleware/errorHandler.js';
import { authRouter } from './src/routes/auth.route.js';

const PORT = process.env.PORT || 8001;

export const createApp = () => {
  const app = express();

  if (isDevelopment()) app.use(morgan('dev'));

  app.use(express.json());
  app.use('/api/v1/bootcamps', bootcampsRouter);
  app.use('/api/v1/courses', coursesRouter);
  app.use('/api/v1/auth', authRouter);
  app.use(errorHandler);

  return app;
};

const app = createApp();

connectDatabase().catch((err) => console.log(`[err]: ${err.message}`.red));

export const server = app.listen(
  PORT,
  console.log(`[app]: http://localhost:${PORT}`.yellow.bold)
);
