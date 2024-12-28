import type { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest';
const { compilerOptions } = require('./tsconfig.json');

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  clearMocks: true,
  testEnvironment: 'node',
  verbose: true,
  roots: ['<rootDir>'],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
};

export default config;
