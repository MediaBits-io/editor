const withTM = require('next-transpile-modules')([
  'imask/esm',
  'react-imask',
  '@etercast/mp3',
]);

module.exports = withTM({
  distDir: '../dist/client',
});
