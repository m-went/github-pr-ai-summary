import 'dotenv/config';

function getEnvVariable(key: string, required = true): string {
  const value = process.env[key];

  if (required && !value) {
    throw new Error(`Brak zmiennej środowiskowej: ${key}`);
  }

  return value || '';
}

export const ENV = {
  PORT: getEnvVariable('PORT'),
  GEMINI_API_KEY: getEnvVariable('GEMINI_API_KEY'),
  GITHUB_TOKEN: getEnvVariable('GITHUB_TOKEN'),
};
