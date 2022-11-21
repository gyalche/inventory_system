import express from 'express';
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
} from '../controller/userController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/getuser/:id', protect, getUser);

export default router;
