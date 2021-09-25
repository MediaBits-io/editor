import { getAuth, User, signInWithEmailAndPassword } from 'firebase/auth';
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
    await signInWithEmailAndPassword(getAuth(), email, password);
  }, []);

  const signOut = useCallback(() => getAuth().signOut(), []);

  const authChangeCallback = useCallback(
    async (user: User | null) => {
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
      return getAuth().onAuthStateChanged(authChangeCallback);
    }
  }, [authChangeCallback, bindAuthListener]);

  return {
    signIn,
    signOut,
  };
}

export default useAuth;
