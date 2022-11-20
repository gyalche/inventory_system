import User from '../model/userModel.js';
import asyncHandler from 'express-async-handler';
// import bcrypt from 'bcryptjs';
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
    // encrypt password;
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);
    // password has been already hashed in model go and check;
    //Create new user;
    const user = await User.create({ email, name, password });
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
