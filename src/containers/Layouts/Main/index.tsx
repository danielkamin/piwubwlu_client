import React from 'react';
import Nav from '../../Shared/Main/Nav';
import { makeStyles, Theme, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Footer from '../../Shared/Main/Footer';
import { useUserContext } from '../../../context/UserContext';
import CustomTheme from '../../../assets/Styles/theme';
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
