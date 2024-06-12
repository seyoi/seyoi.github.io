import axios from 'axios';
import { User } from '@/atoms/atoms';

export const getCookieValue = (name: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
};
export function deleteCookie(name: any, path: any, domain: any) {
  if (getCookieValue(name)) {
    document.cookie =
      name + '=; Max-Age=-99999999;' + (path ? '; path=' + path : '') + (domain ? '; domain=' + domain : '');
  }
}
export const fetchUserData = async (): Promise<User> => {
  const csrf = getCookieValue('csrftoken');
  const accessToken = getCookieValue('access_token');

  if (!csrf || !accessToken) {
    throw new Error('No CSRF token or access token found');
  }

  const response = await axios.get('https://api.oz-02-main-04.xyz/api/v1/users/myinfo', {
    withCredentials: true,
    headers: {
      'X-CSRFToken': csrf,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};
