module.exports = function (api) {
  api.cache(true);
  /* rejester react-native-reanimated plugin here */
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
    ],
  };
};
