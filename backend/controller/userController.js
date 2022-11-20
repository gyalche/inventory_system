import user from '../model/userModel.js';
export const registerUser = async (req, res) => {
  if (!req.body.email) {
    res.status(404).json({ message: 'please add an email' });
    throw new Error('Please add an email');
  }
};
