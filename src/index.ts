import express from 'express';

const app = express();

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

  console.log('Nowy PR:', req.body.pull_request.title);

  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('server działa');
});
