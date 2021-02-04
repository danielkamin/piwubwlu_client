import { createMuiTheme } from '@material-ui/core/styles';
const CustomTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#1D3557'
    },
    secondary: {
      main: '#457B9D'
    },
    error: {
      main: '#E63946'
    },
    warning: {
      main: '#F1FAEE'
    },
    info: {
      main: '#A8DADC'
    }
  },
  shape: {
    borderRadius: 0
  },
  overrides: {
    MuiButton: {},
    MuiTextField: {}
  },
  props: {
    MuiCard: {
      elevation: 6
    },
    MuiPaper: {
      elevation: 3,
      square: true
    },
    MuiButton: {
      disableRipple: true
    }
  }
});
export default CustomTheme;
