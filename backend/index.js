import express from 'express';
import notesRouter from './routers/notes.router.js';
import usersRouter from './routers/users.router.js';
import cors from 'cors';
import mongoose from 'mongoose';
import * as httpStatusText from './utils/httpStatusText.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
// eslint-disable-next-line no-undef
const port = process.env.PORT;
// eslint-disable-next-line no-undef
const url = process.env.MONGO_URL;
app.use(express.json());
app.use(cors());
app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);

main().then(() => console.log('mongodb server started'));

async function main() {
  await mongoose.connect(url);
}

// global middleware for not fund router
app.all('*', (req, res) => {
  return res.status(404).json({
    status: httpStatusText.ERROR,
    message: 'this resourse is not avilable',
  });
});

// global middleware for errors
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    message: error.message,
    status: error.status || httpStatusText.ERROR,
    code: error.statusCode || 500,
    data: null,
  });
});

app.listen(port, () => {
  console.log(`notes app listening on port ${port}`);
});
