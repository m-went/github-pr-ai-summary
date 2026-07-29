import { Octokit } from '@octokit/rest';
import { PullRequestFile } from './types/github.js';

const octokit = new Octokit();

export async function getPullRequestFiles(owner: string, repo: string, number: number) {
  const files = await octokit.rest.pulls.listFiles({
    owner,
    repo,
    pull_number: number,
  });

  return files.data;
}

export async function createComment(owner: string, repo: string, number: number, body: string) {
  await octokit.rest.issues.createComment({
    owner,
    repo,
    issue_number: number,
    body,
  });
}

export function prepareDiff(files: PullRequestFile[]) {
  return files
    .map(
      (file) => `
Plik: ${file.filename}
Status: ${file.status}

Zmiany:

${file.patch}
`,
    )
    .join('\n\n');
}
