import { AuthInfoDTO } from '../../interfaces';
import { api, getAuthHeaders } from './api';

export async function fetchAuthInfo(token: string) {
  return api
    .get<AuthInfoDTO>('/me', {
      headers: await getAuthHeaders(token),
    })
    .then(({ data }) => data);
}
