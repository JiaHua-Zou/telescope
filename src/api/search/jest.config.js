const baseConfig = require('../../../jest.config.base');

module.exports = {
  ...baseConfig,
  rootDir: '../../..',
  testMatch: ['<rootDir>/src/api/search/test/*.test.js'],
  collectCoverageFrom: ['<rootDir>/src.api/search/src/**/*.js'],
};
