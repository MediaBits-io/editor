import * as Sentry from '@sentry/react';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp, getApps } from 'firebase/app';
import { AppProps } from 'next/app';
import GlobalError from '../components/GlobalError';
import firebaseConfig from '../firebaseConfig';
import '../styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
  if (process.browser && !getApps().length) {
    initializeApp(firebaseConfig);
    if (process.env.NODE_ENV === 'production') {
      getAnalytics();
    }
  }

  return (
    <Sentry.ErrorBoundary fallback={<GlobalError />}>
      <Component {...pageProps} />
    </Sentry.ErrorBoundary>
  );
}

export default MyApp;
