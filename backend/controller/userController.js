import User from '../model/userModel.js';
import asyncHandler from 'express-async-handler';
// import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};
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
    //Generate Token;
    const token = generateToken(user._id);

    //send HTTP-only cookie;
    res.cookie('token', token, {
      path: '/',
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
      sameSite: 'none',
      secure: true,
    });

    console.log(token);
    if (user) {
      await user.save();
      res.status(201).json({ user, token });
    } else {
      res.status(500);
      throw new Error('User was able to create');
    }
  } catch (error) {
    res.json({ error: error });
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  try {
    const email = await User.findOne(email);
    if (!email) {
      res.status(404);
      throw new Error('Email  doesnt exist');
    }
  } catch (error) {}
});
