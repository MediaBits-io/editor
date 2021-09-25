import * as functions from 'firebase-functions';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({
  dev,
  // the absolute directory from the package.json file that initialises this module
  // IE: the absolute path from the root of the Cloud Function
  conf: { distDir: 'dist/client' },
});
const handle = app.getRequestHandler();

export const nextServer = functions.https.onRequest((request, response) => {
  // log the page.js file or resource being requested
  console.log('File: ' + request.originalUrl);
  return app.prepare().then(() => handle(request, response));
});
