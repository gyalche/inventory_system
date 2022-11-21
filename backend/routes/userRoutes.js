import express from 'express';
import {
  getUser,
  loginStatus,
  loginUser,
  logoutUser,
  registerUser,
} from '../controller/userController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/getuser', protect, getUser);
router.get('/loggedin', loginStatus)

export default router;
