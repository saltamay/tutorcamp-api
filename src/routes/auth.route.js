import express from 'express';
const authRouter = express.Router();
import { authProtect } from '../middleware/authProtect.js';
import {
  getLoggedInUser,
  login,
  register,
} from '../controllers/auth.controller.js';

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/user', authProtect, getLoggedInUser);

export { authRouter };
