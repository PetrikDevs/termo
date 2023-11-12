import * as dotenv from 'dotenv';
import express from 'express';
import { Request, Response } from 'express';
import { connectToDB, q, saveTestToDB } from './helper/db_helper';
import { dbConfig } from './config/db_config';
import { Test } from './types/tests';

dotenv.config();

const app = express();
const port = process.env.APP_PORT || 3000;

app.get('/tests', async (req: Request, res: Response) => {
  const client = await connectToDB(dbConfig);
  const result = await q(client, 'SELECT * FROM tests');
  await client.end();

  res.json(result.rows);
});

app.post('/tests', async (req: Request, res: Response) => {
  const client = await connectToDB(dbConfig);

  console.log(req.body);

  const test: Test = req.body;
  await saveTestToDB(client, test);
  await client.end();

  res.json(test);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;