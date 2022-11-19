import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { mongo } from './db/db.js';
import morgan from 'morgan';
import bodyParser from 'body-parser';
//importing routes;
import userRoutes from './routes/userRoutes.js';
const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
mongo();
app.use(morgan('dev'));

//Routes;
app.use('/api/users', userRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`listening on server ${PORT}`);
});
