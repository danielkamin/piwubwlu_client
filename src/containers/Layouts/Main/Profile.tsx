import React from 'react';
import { Link } from 'react-router-dom';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import ListOutlinedIcon from '@material-ui/icons/ListOutlined';
import { Button } from '@material-ui/core';
import useStyles from '../../styles';

interface Props {
  children?: any;
}

const ProfileLayout: React.FC<Props> = ({ children }) => {
  const classes = useStyles();
  return (
    <div className='custom-drawer'>
      <ul className='profile-nav'>
        <Link to='/moje_konto' className={classes.buttonlinks}>
          <Button endIcon={<InfoOutlinedIcon />}> Informacje</Button>
        </Link>
        <Link to='/moje_konto/rezerwacje' className={classes.buttonlinks}>
          <Button endIcon={<ListOutlinedIcon />}> Rezerwacje </Button>
        </Link>
        <Link to='/moje_konto/zmiana_hasla' className={classes.buttonlinks}>
          <Button endIcon={<VpnKeyOutlinedIcon />}> Zmiana Hasła </Button>
        </Link>
        <Link to='/moje_konto/usun_konto' className={classes.buttonlinks}>
          <Button endIcon={<DeleteForeverOutlinedIcon />}> Usuń konto </Button>
        </Link>{' '}
      </ul>
      {children}
    </div>
  );
};

export default ProfileLayout;
