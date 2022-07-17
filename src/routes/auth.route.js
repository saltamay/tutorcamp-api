import express from 'express';
const authRouter = express.Router();
import { register } from '../controllers/auth.controller.js';

authRouter.post('/register', register);

export { authRouter };
