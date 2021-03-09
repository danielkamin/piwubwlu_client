import React, { useEffect, useState } from 'react';
import { setAccessToken, setRoles } from './utils/api/accessToken';
import './assets/Styles/app.css';
import Router from './Router/Router';
import customAxios from './utils/api/customAxios';
import { API_URL } from './utils/constants';
const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    initAppResources();
  }, []);
  async function refreshToken() {
    await customAxios
      .post(API_URL + '/auth/refresh_token')
      .then((res: any) => {
        setAccessToken(res.data.accessToken);
        setRoles(res.data.accessToken);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }
  const initAppResources = async (): Promise<void> => {
    await refreshToken();
    setLoading(false);
  };

  if (loading) {
    return <div>loading...</div>;
  }

  return <Router />;
};

export default App;
