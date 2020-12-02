import { AppProps } from 'next/app';
import firebase from 'firebase/app';
import 'firebase/analytics';
import '../styles/global.css';
import firebaseConfig from '../firebaseConfig';

function MyApp({ Component, pageProps }: AppProps) {
  if (typeof window !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    if (process.env.NODE_ENV === 'production') {
      firebase.analytics();
    }
  }

  return <Component {...pageProps} />;
}

export default MyApp;
