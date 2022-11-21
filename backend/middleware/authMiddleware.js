import asyncHandler from 'express-async-handler';
import User from '../model/userModel.js';
import jwt from 'jsonwebtoken';

export const protect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401);
      throw new Error('Not authorized');
    }
    //Verified token;
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    //Get user id from token;
    const user = await User.findById(verified.id).select('-password');
    if (!user) {
      res.status(404);
      throw new Error('user not found');
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error('not authroized, please login');
  }
});
