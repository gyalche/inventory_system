import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// dotenv.config();

export const mongo = async () => {
  await mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`mongodb is connected at ${data.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
};
