import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';

import { isDevelopment } from './src/utils.js';
import { bootcamps } from './src/routes/bootcamps.route.js';

const PORT = process.env.PORT || 8001;
const app = express();

if (isDevelopment()) app.use(morgan('dev'));

app.use('/api/v1/bootcamps', bootcamps);

app.listen(PORT, console.log(`[app]: http://localhost:${PORT}`));
