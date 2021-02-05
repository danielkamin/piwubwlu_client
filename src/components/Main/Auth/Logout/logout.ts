import customAxios from '../../../../utils/api/customAxios';
import { setAccessToken, getAccessToken, setRoles } from '../../../../utils/api/accessToken';
import { API_URL } from '../../../../utils/constants';
export const logout = async () => {
  await customAxios(API_URL+'/auth/logout', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + getAccessToken() },
  }).catch((err) => console.log(err));
  setAccessToken('');
  setRoles('');
};