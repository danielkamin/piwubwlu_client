import React, { useState, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';

const CASLogin: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  useEffect(() => {
    redirectTest();
  }, []);
  const redirectTest = async () => {
    axios
      .get('http://77.46.45.243:5000/api/cas/login')
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  return <div></div>;
};

export default CASLogin;
