import { Octokit } from '@octokit/rest';
import { PullRequestFile } from './types/github.js';
import { BINARY_EXTENSIONS, IGNORED_DIRECTORIES, IGNORED_FILES } from './config/ignoredFiles.js';

const octokit = new Octokit();

function isBinaryFile(filename: string) {
  return BINARY_EXTENSIONS.some((ext) => filename.toLowerCase().endsWith(ext));
}

export function filterFiles(files: PullRequestFile[]) {
  return files.filter((file) => {
    const filename = file.filename;

    if (isBinaryFile(filename)) {
      return false;
    }

    if (IGNORED_FILES.includes(filename)) {
      return false;
    }

    if (IGNORED_DIRECTORIES.some((dir) => filename.startsWith(dir))) {
      return false;
    }

    return true;
  });
}

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
