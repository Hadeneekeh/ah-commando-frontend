module.exports = {
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFiles: ['<rootDir>src/setupTests.js'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules',
  },
  collectCoverage: true,
  coverageReporters: [
    'json',
    'lcov',
    'text',
  ],
};
