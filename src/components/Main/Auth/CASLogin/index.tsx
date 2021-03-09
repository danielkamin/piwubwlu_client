import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';

const CASLogin: React.FC = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {}, []);
  if (loading)
    return (
      <div>
        <CircularProgress />
      </div>
    );
  return <div></div>;
};

export default CASLogin;
