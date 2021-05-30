import express from 'express';
import dotenv from 'dotenv';

// Import routers
import bootcamps from './routes/bootcamps';

// Load env variables
dotenv.config();

const app = express();

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 8000;
const ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, () =>
  console.log(`Server running in '${ENV}' mode on port: ${PORT}`)
);
