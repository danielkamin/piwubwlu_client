import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AppBar, CssBaseline, Divider, Drawer, Hidden, IconButton, List, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import useStyles from '../styles';
import { logout } from '../../Nav/Logout';
import { useUserContext } from '../../Context/UserContext';
import Links from './Links';
import { Link } from 'react-router-dom';
interface Props {
  window?: () => Window;
  children?: any;
}

const Nav: React.FC<Props> = (props) => {
  const { window } = props;
  const classes = useStyles();
  const history = useHistory();
  const context = useUserContext();

  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const redirectLogout = async () => {
    await logout();
    context?.changeState(false, []);
    history.push('/admin/login');
  };
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {' '}
        <Links />
      </List>
      <Divider />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton color='inherit' aria-label='open drawer' edge='start' onClick={handleDrawerToggle} className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap>
            Politechnika Białostocka
          </Typography>
          <div className={classes.grow} />
          <div>
            <IconButton component={Link} to='/admin/my_profile' color='inherit'>
              <AccountCircleOutlinedIcon />
            </IconButton>

            <IconButton onClick={redirectLogout} color='inherit'>
              <PowerSettingsNewIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label='mailbox folders'>
        <Hidden smUp implementation='css'>
          <Drawer
            container={container}
            variant='temporary'
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant='permanent'
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      {props.children}
    </div>
  );
};
export default Nav;
