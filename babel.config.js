module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
        safe: false,
        allowUndefined: true,
        verbose: false,
      },
    ],
  ],
};
