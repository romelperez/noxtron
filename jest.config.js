module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  verbose: true,
  testURL: 'http://localhost/',
  testMatch: [
    './src/**/*.test.ts',
    './src/**/*.test.tsx'
  ]
};
