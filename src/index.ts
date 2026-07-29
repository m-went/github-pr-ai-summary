import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/github-webhook', async (req, res) => {
  const event = req.headers['x-github-event'];

  console.log(event);

  if (event !== 'pull_request') {
    return res.sendStatus(200);
  }

  const action = req.body.action;

  if (action !== 'opened' && action !== 'synchronize') {
    return res.sendStatus(200);
  }

  console.log('Dane body:', req.body);
  console.log('Nowy PR:', req.body.pull_request.title);

  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
