import Axios from 'axios';
import { getAuth } from 'firebase/auth';
import { API_URL } from '../../constants';

export const api = Axios.create({
  baseURL: API_URL,
  timeout: 30000,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      getAuth().signOut();
    }
    throw err;
  }
);

export const getAuthHeaders = async (userToken?: string) => {
  const token = userToken ?? (await getAuth().currentUser?.getIdToken());
  if (!token) {
    throw new Error('No user token to fetch links');
  }
  return { Authorization: `Bearer ${token}` };
};
