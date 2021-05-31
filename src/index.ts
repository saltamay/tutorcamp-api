// Load env variables
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import morgan from 'morgan';
import db from './config/db';

// Import routers
import bootcamps from './routes/bootcamps';

const PORT = process.env.PORT || 8000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Connect to database
db();

const app = express();

// Dev logging middleware
if (NODE_ENV == 'development') {
  app.use(morgan('dev'));
}
// Mount routers
app.use('/api/v1/bootcamps', bootcamps);

const server = app.listen(PORT, () =>
  console.log(`Server running in '${NODE_ENV}' mode on port: ${PORT}`)
);

// Handle unhandled promise rejection
process.on('unhandledRejection', (err: Error) => {
  console.log(`Error: ${err.message}`);
  // Cloase the server & exit
  server.close(() => process.exit(1));
});
