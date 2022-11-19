import user from '../model/userModel.js';
export const registerUser = async (req, res) => {
  if (!req.body.email) {
    res.status(404);
    throw new Error('Please add an email');
  }
};
