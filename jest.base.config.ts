import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jest-environment-jsdom',
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|ts|tsx)$'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx', 'node', 'mjs'],
};

export default config;
