import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { mongo } from './db/db.js';
import morgan from 'morgan';

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
mongo();
app.use(morgan('dev'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`listening on server ${PORT}`);
});
