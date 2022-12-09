const port = 80;
import express from 'express';

const app = express();

app.set('trust proxy', true);

app.get('/', (req, res) => {
  res.send('Hello World d!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
