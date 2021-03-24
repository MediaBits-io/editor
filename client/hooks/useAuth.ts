import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import { useCallback, useEffect } from 'react';
import cookies from 'js-cookie';
import { fetchAuthInfo } from '../utils/api/auth';
import useUserDispatcher from '../state/dispatchers/user';

interface Params {
  bindAuthListener?: boolean;
}

function useAuth({ bindAuthListener = false }: Params = {}) {
  const { setUserAuthenticated, setUserUnauthenticated } = useUserDispatcher();

  const signIn = useCallback(async (email: string, password: string) => {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  }, []);

  const signOut = useCallback(() => firebase.auth().signOut(), []);

  const authChangeCallback = useCallback(
    async (user: firebase.User | null) => {
      if (!user) {
        cookies.remove('userToken');
        setUserUnauthenticated();
        return;
      }

      const token = await user.getIdToken();
      cookies.set('userToken', token, { expires: 14 });
      const authInfo = await fetchAuthInfo(token);
      setUserAuthenticated(authInfo);
    },
    [setUserAuthenticated, setUserUnauthenticated]
  );

  useEffect(() => {
    if (bindAuthListener) {
      return firebase.auth().onAuthStateChanged(authChangeCallback);
    }
  }, [authChangeCallback, bindAuthListener]);

  return {
    signIn,
    signOut,
  };
}

export default useAuth;
