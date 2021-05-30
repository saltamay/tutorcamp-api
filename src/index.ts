import express from 'express';
import dotenv from 'dotenv';

// Load env variables
dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

const ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, () =>
  console.log(`Server running in '${ENV}' mode on port: ${PORT}`)
);
