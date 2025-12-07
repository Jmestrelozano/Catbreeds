module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@env$': '<rootDir>/jest.env.helper.js',
    '\\.svg$': '<rootDir>/__mocks__/svgMock.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@react-navigation/native|@react-navigation/native-stack|react-native-safe-area-context|react-native-screens|react-native-gesture-handler|@react-native-masked-view)/)',
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.ts',
    '!src/types/**',
    '!src/native/**',
    '!src/**/*.styles.{ts,tsx}',
    '!src/**/styles/**',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/src/native/',
    '/src/.*styles/',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html', 'json-summary'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  testEnvironment: 'node',
};
