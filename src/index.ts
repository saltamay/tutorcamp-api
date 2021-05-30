// Load env variables
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import morgan from 'morgan';

// Import routers
import bootcamps from './routes/bootcamps';

const PORT = process.env.PORT || 8000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const app = express();

// Dev logging middleware
if (NODE_ENV == 'development') {
  app.use(morgan('dev'));
}
// Mount routers
app.use('/api/v1/bootcamps', bootcamps);

app.listen(PORT, () =>
  console.log(`Server running in '${NODE_ENV}' mode on port: ${PORT}`)
);
