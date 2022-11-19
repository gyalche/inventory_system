import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

        'please enter a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'please add a password'],
      minLength: [6, 'Password must container at least 6 character'],
      maxLength: [32, 'Password should not be longer than 32 characters'],
    },
    photo: {
      type: String,
      required: [true, 'please add a photo'],
      default: 'https://i.ibb.co/4pDNDk1/avatar.png',
    },
    phone: {
      type: String,
      default: '+977',
    },
    bio: {
      type: String,
      maxLength: [200, 'Not more than 200 character'],
      default: 'bio',
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
