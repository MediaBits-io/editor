import firebase from 'firebase';
import 'firebase/analytics';
import 'firebase/auth';
import { useCallback, useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';
import cookies from 'js-cookie';
import { AuthInfo, Plan, UserInfo, UserPlan } from '../interfaces';
import { PlansContainer } from './PlansContainer';
import { api, getAuthHeaders } from '../utils/api';

const defaultPlan = {
  plan: Plan.Free,
  createdAt: new Date(),
};

interface InitialState {
  user: UserInfo | null;
  plan: UserPlan | null;
}

function useUser(initialState: InitialState) {
  const { plans } = PlansContainer.useContainer();
  const [userInfo, setUserInfo] = useState(initialState.user);
  const [userPlan, setUserPlan] = useState<UserPlan>(
    initialState.plan || defaultPlan
  );

  const signIn = useCallback(async (email: string, password: string) => {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        cookies.set('userToken', token, { expires: 14 });

        const authInfo = await api
          .get<AuthInfo>('/me', {
            headers: await getAuthHeaders(token),
          })
          .then(({ data }) => data);

        setUserInfo(authInfo.user);
        setUserPlan(authInfo.plan || defaultPlan);
      } else {
        setUserInfo(null);
        setUserPlan(defaultPlan);
        cookies.remove('userToken');
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
