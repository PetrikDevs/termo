import * as dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
const port = process.env.APP_PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;