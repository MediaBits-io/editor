import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import { useCallback, useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';
import cookies from 'js-cookie';
import { AuthInfo, deserializeAuthInfoDTO, Plan } from '../interfaces';
import { PlansContainer } from './PlansContainer';
import { fetchAuthInfo } from '../utils/api/auth';

interface InitialState {
  authInfo: AuthInfo;
}

function useUser(initialState: InitialState) {
  const { plans } = PlansContainer.useContainer();
  const [userInfo, setUserInfo] = useState(initialState.authInfo?.user);
  const [userPlan, setUserPlan] = useState(initialState.authInfo?.plan);

  const signIn = useCallback(async (email: string, password: string) => {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        cookies.set('userToken', token, { expires: 14 });

        const authInfo = await fetchAuthInfo(token).then(
          deserializeAuthInfoDTO
        );
        setUserInfo(authInfo.user);
        setUserPlan(authInfo.plan);
      } else {
        cookies.remove('userToken');
        setUserInfo(undefined);
        setUserPlan({
          plan: Plan.Free,
          createdAt: new Date(),
        });
      }
    });
  }, []);

  const userPlanInfo = plans[userPlan.plan];

  return {
    userInfo,
    userPlan,
    userPlanInfo,
    signIn,
  };
}

export const UserContainer = createContainer(useUser);
