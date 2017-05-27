module.exports = {
  navigateFallback: '/index.html',
  navigateFallbackWhitelist: [/\/__/],
  stripPrefix: 'dist',
  root: 'dist/',
  staticFileGlobs: [
    'dist/index.html',
    'dist/**.js',
    'dist/**.css',
    'dist/**.woff2',
    'dist/assets/images/icon.png',
    'dist/assets/audio/chime.mp3'
  ]
};
