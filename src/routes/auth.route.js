import express from 'express';
const authRouter = express.Router();
import { login, register } from '../controllers/auth.controller.js';

authRouter.post('/register', register);
authRouter.post('/login', login);

export { authRouter };
