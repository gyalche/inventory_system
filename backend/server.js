import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { mongo } from './db/db.js';
import morgan from 'morgan';
import bodyParser from 'body-parser';
//importing routes;
import userRoutes from './routes/userRoutes.js';
//error handler import;
import { errorHandler } from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());

//database connection
mongo();

//Routes;
app.use('/api/users', userRoutes);
const PORT = process.env.PORT || 5000;

//ERROR MIDDLEWARE;
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening on server ${PORT}`);
});
