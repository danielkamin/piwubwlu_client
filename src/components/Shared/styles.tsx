import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  buttonlinks: {
    textDecoration: 'none',
    color: 'initial'
  },
  addbtn: {
    margin: '1rem 0'
  },
  largeAvatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin: '20px auto',
    borderRadius: '50%',
    boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.4)'
  },
  image: {
    width: theme.spacing(24),
    height: theme.spacing(24)
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: 30
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  topSpace: {
    margin: '5rem 0'
  },
  rentForm: {
    display: 'flex',
    alignItems: 'baseline',
    '& > *': {
      margin: '0 10px'
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      '& > *': {
        margin: '10px 0'
      }
    }
  },
  wideSelect: {
    width: 150
  },
  spacing: {
    marginBottom: '4rem',
    marginTop: '4rem'
  }
}));
export default useStyles;
