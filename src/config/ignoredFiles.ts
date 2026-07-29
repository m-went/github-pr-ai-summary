export const IGNORED_FILES = [
  'package-lock.json',
  'package.json',
  'pnpm-lock.yaml',
  'yarn.lock',
  '.gitignore',
  '.gitattributes',
  '.editorconfig',
  '.prettierrc',
  '.prettierignore',
  '.eslintrc',
  '.eslintrc.js',
  '.eslintrc.json',
  '.eslintignore',
  'tsconfig.json',
  'README.md',
  'CHANGELOG.md',
  'LICENSE',
];

export const BINARY_EXTENSIONS = [
  // obrazy
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.webp',
  '.ico',
  '.svg',

  // video
  '.mp4',
  '.mov',
  '.avi',
  '.webm',

  // audio
  '.mp3',
  '.wav',
  '.ogg',

  // archiwa
  '.zip',
  '.rar',
  '.7z',
  '.tar',
  '.gz',

  // dokumenty binarne
  '.pdf',
  '.doc',
  '.docx',
  '.xls',
  '.xlsx',

  // fonty
  '.woff',
  '.woff2',
  '.ttf',
  '.otf',

  // executables
  '.exe',
  '.dll',
  '.so',
];

export const IGNORED_DIRECTORIES = ['.github/', '.vscode/', '.idea/', 'dist/', 'build/', 'coverage/', 'node_modules/'];
