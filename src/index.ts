import express from 'express';
import { createComment, filterFiles, getPullRequestFiles, prepareDiff } from './github.js';
import { summarize } from './ai.js';
import { ENV } from './config/env.js';

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

  console.log('Dane body:', req.body);
  console.log('Nowy PR:', req.body.pull_request.title);

  const owner = req.body.repository.owner.login;

  const repo = req.body.repository.name;

  const number = req.body.pull_request.number;

  try {
    const files = await getPullRequestFiles(owner, repo, number);
    const filteredFiles = filterFiles(files);

    if (filteredFiles.length === 0) {
      await createComment(
        owner,
        repo,
        number,
        'W Pull Requeście nie wykryto zmian wymagających podsumowania (zmieniono wyłącznie pliki konfiguracyjne lub pomocnicze).',
      );

      return;
    }

    const diff = prepareDiff(filteredFiles);

    const summary = await summarize(diff);
    console.log(summary);
    await createComment(owner, repo, number, summary);

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(ENV.PORT, () => {
  console.log(`Listening on port: ${ENV.PORT}`);
});
