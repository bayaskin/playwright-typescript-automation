export type Environment = 'qa' | 'staging' | 'production';

interface EnvironmentConfig {
  apiBaseUrl: string;
  uiBaseUrl: string;
}

const environments: Record<Environment, EnvironmentConfig> = {
  qa: {
    apiBaseUrl: 'https://jsonplaceholder.typicode.com',
    uiBaseUrl: 'https://demo.playwright.dev',
  },
  staging: {
    apiBaseUrl: 'https://jsonplaceholder.typicode.com',
    uiBaseUrl: 'https://demo.playwright.dev',
  },
  production: {
    apiBaseUrl: 'https://jsonplaceholder.typicode.com',
    uiBaseUrl: 'https://demo.playwright.dev',
  },
};

const selectedEnvironment =
  (process.env.TEST_ENV ?? 'qa') as Environment;

if (!(selectedEnvironment in environments)) {
  throw new Error(`Unsupported TEST_ENV: ${selectedEnvironment}`);
}

export const config = {
  environment: selectedEnvironment,
  ...environments[selectedEnvironment],
};
