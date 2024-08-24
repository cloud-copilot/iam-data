/** @type {import('ts-jest').JestConfigWithTsJest} */
const { defaults } = require('jest-config')

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    "<rootDir>/src/**/*.test.ts"
  ],
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    ...defaults.coveragePathIgnorePatterns
  ]
};