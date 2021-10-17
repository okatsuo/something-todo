/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',

  clearMocks: true,

  roots: ['<rootDir>/tests/', '<rootDir>/src/'],

  testPathIgnorePatterns: ['<rootDir>/dist'],

  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**/*.ts',
    '!<rootDir>/src/domain/**/*.ts',
    '!<rootDir>/src/helper/**/*.ts'
  ],

  coverageDirectory: 'coverage',

  coverageProvider: 'v8',

  testEnvironment: 'node',

  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
