module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'transform-inline-environment-variables',
      'nativewind/babel',
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          alias: {},
        },
      ],
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel', 'react-native-reanimated/plugin'],
      },
    },
  };
};
