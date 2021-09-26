// @ts-ignore-next-line
const { withSentryConfig } = require('@sentry/nextjs');
const withTM = require('next-transpile-modules')([
  'imask/esm',
  'react-imask',
  '@vincaslt/mp3',
]);

const SentryWebpackPluginOptions = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(
  {
    sentry: {
      disableServerWebpackPlugin: true,
    },
    ...withTM({
      distDir: '../dist/client',
    }),
  },
  SentryWebpackPluginOptions
);
