module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFiles: ['./jest.polyfills.js'],
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  setupFilesAfterEnv: ['<rootDir>/msw.setup.js'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(tough-cookie|msw)/)', // Transforma tough-cookie y msw
  ],
};
