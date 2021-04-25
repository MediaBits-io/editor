import * as Sentry from '@sentry/react';
import 'firebase/analytics';
import firebase from 'firebase/app';
import { AppProps } from 'next/app';
import GlobalError from '../components/GlobalError';
import firebaseConfig from '../firebaseConfig';
import '../styles/global.css';

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
