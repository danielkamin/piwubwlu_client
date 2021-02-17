import axios from 'axios';
import { setAccessToken } from './accessToken';
import {API_URL} from '../constants'
const customAxios = axios.create({
  baseURL: API_URL,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  withCredentials: true,
});
customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      await customAxios
        .post(API_URL+'/auth/refresh_token')
        .then((res) => {
          console.log('error 401');
          const accessToken = res.data.accessToken;
          error.response.config.headers.Authorization = 'Bearer ' + accessToken;
          setAccessToken(accessToken);
        });
      console.log('próba ponowienia akcji');
      return axios.request(error.response.config);
    }
    else if(error.response.status === 403)
    {     
      return Promise.reject(error.response);
    }
    return Promise.reject(error.response);
    //error.response to obiekt trzymający całe info
  }
);
export default customAxios;
