import User from '../model/userModel.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};
export const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, photo, phone, bio } = req.body;
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

//Login user
export const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    //validate request body;
    if (!email || !password) {
      res.status(400);
      throw new Error('Please add email and password');
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    //if user exist not  check for password correc;
    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    //Genereat token now;
    const token = generateToken(user._id);
    //send HTTP-only cookie;
    res.cookie('token', token, {
      path: '/',
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 1000 * 86400), //1 day;
      sameSite: 'none',
    });

    if (user && passwordIsCorrect) {
      res.status(200).json({ user, token });
    } else {
      res.status(400);
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    res.json(error);
  }
});
