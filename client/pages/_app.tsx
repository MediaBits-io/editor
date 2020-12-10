import { AppProps } from 'next/app';
import firebase from 'firebase/app';
import 'firebase/analytics';
import '../styles/global.css';
import firebaseConfig from '../firebaseConfig';
import ErrorBoundary from '../components/ErrorBoundary';

function MyApp({ Component, pageProps }: AppProps) {
  if (process.browser && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    if (process.env.NODE_ENV === 'production') {
      firebase.analytics();
    }
  }

  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}

export default MyApp;
