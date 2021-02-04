import React from 'react';
import { getLogoImage, getBackgroundImage } from '../../Helpers/images';
import useStyles from '../Login/styles';
import { Container, CssBaseline, Avatar, Typography } from '@material-ui/core';
interface Props {
  message: string;
}

const TokenExpired: React.FC<Props> = ({ message }) => {
  const classes = useStyles();
  return (
    <div className='black-hidden login-register'>
      <img src={getBackgroundImage()} className='img-cover' />
      <Container component='main' maxWidth='sm' className='form'>
        <div className={classes.paper}>
          <Avatar src={getLogoImage()} className={classes.avatarLarge} />
          <div className={classes.form}>
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
