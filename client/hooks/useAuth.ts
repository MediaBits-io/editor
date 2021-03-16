import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import { useCallback, useEffect, useMemo } from 'react';
import cookies from 'js-cookie';
import { fetchAuthInfo } from '../utils/api/auth';
import { useRecoilCallback } from 'recoil';
import { userInfoState, userPlanState } from '../state/user';
import { deserializeUserPlanDTO } from '../interfaces/user';

interface Params {
  bindAuthListener?: boolean;
}

function useAuth({ bindAuthListener = false }: Params = {}) {
  const signIn = useCallback(async (email: string, password: string) => {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  }, []);

  const signOut = useCallback(() => firebase.auth().signOut(), []);

  const authChangeCallback = useRecoilCallback<
    [firebase.User | null],
    Promise<void>
  >(
    ({ set, reset }) => async (user) => {
      if (!user) {
        cookies.remove('userToken');
        reset(userInfoState);
        reset(userPlanState);
        return;
      }

      const token = await user.getIdToken();
      cookies.set('userToken', token, { expires: 14 });
      const authInfo = await fetchAuthInfo(token);

      set(userInfoState, authInfo.user);

      if (authInfo.plan) {
        set(userPlanState, deserializeUserPlanDTO(authInfo.plan));
      } else {
        reset(userPlanState);
      }
    },
    []
  );

  useEffect(() => {
    if (bindAuthListener) {
      return firebase.auth().onAuthStateChanged(authChangeCallback);
    }
  }, [authChangeCallback, bindAuthListener]);

  return useMemo(
    () => ({
      signIn,
      signOut,
    }),
    [signIn, signOut]
  );
}

export default useAuth;
