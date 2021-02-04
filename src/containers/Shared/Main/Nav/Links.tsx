import { IconButton, Toolbar, Button } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { logout } from '../../Nav/Logout';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import useStyles from '../styles';
import { useUserContext } from '../../Context/UserContext';
import { Link } from 'react-router-dom';
import { AccountCircleOutlined } from '@material-ui/icons';
const Links: React.FC = () => {
  const classes = useStyles();
  const context = useUserContext();
  const history = useHistory();
  const redirectLogout = async () => {
    await logout();
    context?.changeState(false, []);
    history.push('/');
  };
  return (
    <Toolbar>
      <IconButton color='inherit' edge='start' component={Link} to='/'>
        <HomeOutlinedIcon />
      </IconButton>
      <div className={classes.grow} />
      {context?.loggedIn ? (
        <div>
          <IconButton color='inherit' component={Link} to='/moje_konto'>
            <AccountCircleOutlined />
          </IconButton>

          <Button color='inherit' onClick={redirectLogout}>
            Wyloguj się
          </Button>
        </div>
      ) : (
        <div>
          <Button color='inherit' component={Link} to='/rejestracja'>
            Rejestracja
          </Button>
          <Button color='inherit' component={Link} to='/login'>
            Login
          </Button>
        </div>
      )}
    </Toolbar>
  );
};

export default Links;
