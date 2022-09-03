import express from 'express';

const app = express();
const port = 80;

app.set('trust proxy', true);

app.get('/', (req, res) => {
  res.send('Hello World d!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
