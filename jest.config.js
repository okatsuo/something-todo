/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',

  clearMocks: true,

  roots: ['<rootDir>/tests'],

  testPathIgnorePatterns: ['<rootDir>/dist'],

  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/main/**'],

  coverageDirectory: 'coverage',

  coverageProvider: 'v8',

  testEnvironment: 'node',

  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
