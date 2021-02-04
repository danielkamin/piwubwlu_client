import React from 'react';
import Nav from './Nav';
import { makeStyles, Theme, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Footer from '../Footer';
import { useUserContext } from '../../Context/UserContext';
import CustomTheme from '../../../Helpers/theme';
interface Props {
  children?: any;
}
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex'
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
}));

const MainLayout: React.FC<Props> = ({ children }) => {
  const classes = useStyles();
  const context = useUserContext();
  return (
    <ThemeProvider theme={CustomTheme}>
      <main className='main-container'>
        <Nav />
        <div className='container'>{children}</div>
      </main>
      <Footer />
    </ThemeProvider>
  );
};

export default MainLayout;
