import React from 'react';

import useStyles from '../styles';
import { Container, Avatar, Typography } from '@material-ui/core';
interface Props {
  message: string;
}

const TokenExpired: React.FC<Props> = ({ message }) => {
  const classes = useStyles();
  return (
    <div className='black-hidden login-register'>
      <img src='' className='img-cover' />
      <Container component='main' maxWidth='sm' className='form'>
        <div>
          <Avatar src='' />
          <div>
            <Typography variant='subtitle2' className='error'>
              {message}
            </Typography>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TokenExpired;
