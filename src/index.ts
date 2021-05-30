import express from 'express';
import dotenv from 'dotenv';

// Load env variables
dotenv.config();

const app = express();

app.get('/api/v1/bootcamps', (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: 'Show all bootcamps',
  });
});

app.get('/api/v1/bootcamps/:id', (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Show bootcamp ${req.params.id}`,
  });
});

app.post('/api/v1/bootcamps', (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: 'Create a bootcamp',
  });
});

app.put('/api/v1/bootcamps/:id', (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Update bootcamp ${req.params.id}`,
  });
});

app.delete('/api/v1/bootcamps/:id', (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Delete bootcamp ${req.params.id}`,
  });
});

const PORT = process.env.PORT || 8000;
const ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, () =>
  console.log(`Server running in '${ENV}' mode on port: ${PORT}`)
);
