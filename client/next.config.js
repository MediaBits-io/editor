// @ts-ignore-next-line
const { withSentryConfig } = require('@sentry/nextjs');
const withTM = require('next-transpile-modules')([
  'imask/esm',
  'react-imask',
  '@etercast/mp3',
]);

const SentryWebpackPluginOptions = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(
  withTM({
    distDir: '../dist/client',
    future: {
      webpack5: true,
    },
  }),
  SentryWebpackPluginOptions
);
