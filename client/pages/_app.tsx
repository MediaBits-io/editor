import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import 'firebase/analytics';
import firebase from 'firebase/app';
import { AppProps } from 'next/app';
import GlobalError from '../components/GlobalError';
import firebaseConfig from '../firebaseConfig';
import '../styles/global.css';

Sentry.init({
  dsn:
    'https://5a2c275562c54e6b9dd58ea690cea37a@o578440.ingest.sentry.io/5734674',
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

function MyApp({ Component, pageProps }: AppProps) {
  if (process.browser && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    if (process.env.NODE_ENV === 'production') {
      firebase.analytics();
    }
  }

  return (
    <Sentry.ErrorBoundary fallback={<GlobalError />}>
      <Component {...pageProps} />
    </Sentry.ErrorBoundary>
  );
}

export default MyApp;
