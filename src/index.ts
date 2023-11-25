import * as dotenv from 'dotenv';
import express from 'express';
import { json } from 'express';
import routerMotors from './router/motorsRoutes';
import routerTest from './router/testsRoutes';
import routerTemp from './router/tempRoutes';
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

app.use(routerMotors);
app.use(routerTest);
app.use(routerTemp);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});