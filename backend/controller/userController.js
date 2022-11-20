import User from '../model/userModel.js';
import asyncHandler from 'express-async-handler';
export const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //validation
    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Please fill in all required fields');
    }
    if (password.length < 6) {
      res.status(400);
      throw new Error('Password must be at least 6 characters');
    }
    //check user email if already exists;
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      res.status(400);
      throw new Error('Email is already in use');
    }
    //Create new user;
    const user = await User.create({ name, email, password });
    if (user) {
      await user.save();
      res.status(201).json(user);
    } else {
      res.status(500);
      throw new Error('User was able to create');
    }
  } catch (error) {
    res.json({ error: error });
  }
});
