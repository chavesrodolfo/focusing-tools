const swBuild = require('workbox-build');

swBuild.generateSW({
  navigateFallback: 'index.html',
  globDirectory: './dist',
  globPatterns: [
    'index.html',
    '**.js',
    '**.css',
    '**.woff2',
    'assets/images/icon.png',
    'assets/images/icon.svg',
    'assets/audio/chime.mp3',
    'assets/fonts/**/**.woff2'
  ],
  swDest: 'dist/service-worker.js',
  // runtimeCaching: [
  //   {
  //     urlPattern: /\/api\/pokemon\//,
  //     handler: 'networkFirst',
  //     options: {
  //       cacheName: 'api-cache',
  //       cacheExpiration: {
  //         maxEntries: 10
  //       }
  //     }
  //   }
  // ]
}).then(() => console.log('Service Worker generated')).catch(err => console.error(err, 'Service Worker failed to generate'));
