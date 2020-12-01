import Axios from 'axios';
import firebase from 'firebase/app';
import { API_URL } from '../constants';

export const api = Axios.create({
  baseURL: API_URL,
  timeout: 30000,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      firebase.auth().signOut();
    }
    throw err;
  }
);

export const getAuthHeaders = async () => {
  const token = await firebase.auth().currentUser?.getIdToken();
  if (!token) {
    throw new Error('No user token to fetch links');
  }
  return { Authorization: `Bearer ${token}` };
};
