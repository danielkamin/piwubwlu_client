import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useUserContext } from '../../Context/UserContext';
import { CssBaseline, AppBar } from '@material-ui/core';
import useStyles from '../styles';
import Links from './Links';
interface Props {}

const Nav: React.FC<Props> = () => {
  const classes = useStyles();
  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Links />
      </AppBar>
    </div>
  );
};

export default Nav;
