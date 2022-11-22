import express from 'express';
import {
  forgotPassword,
  getUser,
  loginStatus,
  loginUser,
  logoutUser,
  passwordUpdate,
  registerUser,
  updateUser,
} from '../controller/userController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/getuser', protect, getUser);
router.get('/loggedin', loginStatus);
router.put('/updateuser', protect, updateUser);
router.put('/passwordupdate', protect, passwordUpdate);
router.post('/forgotpassword', forgotPassword);

export default router;
