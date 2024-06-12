import axios from 'axios';

export interface User {
  id: number;
  계정: string;
  닉네임: string;
}

export const fetchUserData = async (csrf: string, accessToken: string): Promise<User> => {
  const response = await axios.get('https://api.oz-02-main-04.xyz/api/v1/users/myinfo', {
    withCredentials: true,
    headers: {
      'X-CSRFToken': csrf,
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
