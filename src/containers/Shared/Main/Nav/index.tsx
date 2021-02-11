import React from 'react';
import { AppBar } from '@material-ui/core';
import useStyles from '../../../styles';
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
