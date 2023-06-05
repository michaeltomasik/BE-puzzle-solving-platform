import express from 'express';

import { userRouter, puzzleRouter } from './api/routes';
import dotenv from 'dotenv';
import sequelize from './config/db';
import { blacklistLogout } from './api/middleware/blacklistLogout';

dotenv.config();
const app = express();
app.use(express.json());

app.use(blacklistLogout);

app.use('/api/user', userRouter);
app.use('/api/puzzle', puzzleRouter);

sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Server running at http://localhost:3000'));
});