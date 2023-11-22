import * as dotenv from 'dotenv';
import express from 'express';
import { json } from 'express';
import testsRoutes from './router/testsRoutes';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.APP_PORT || 3000;

app.use(cors(
  {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
));
app.use(json());

app.use(testsRoutes);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});