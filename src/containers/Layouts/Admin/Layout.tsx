import React from 'react';
import AdminNav from './AdminNav';
import { makeStyles, Theme, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useUserContext } from '../../Context/UserContext';
import CustomTheme from '../../../Helpers/theme';
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex'
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    padding: theme.spacing(3)
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
}));
//https://coolors.co/e63946-f1faee-a8dadc-457b9d-1d3557
interface Props {
  children?: any;
}
const AdminLayout: React.FC<Props> = ({ children }) => {
  const classes = useStyles();
  const context = useUserContext();
  return (
    <ThemeProvider theme={CustomTheme}>
      {context?.loggedIn ? (
        <AdminNav>
          {' '}
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            {children}
          </main>
        </AdminNav>
      ) : (
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {children}
        </main>
      )}
    </ThemeProvider>
  );
};

export default AdminLayout;
