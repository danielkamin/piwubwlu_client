import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '1.5rem'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  avatarLarge: {
    width: theme.spacing(9),
    height: theme.spacing(9)
  },
  formControlGap: {
    marginTop: 7
  },
  table: {
    minWidth: 650
  },
  container: {
    marginBottom: 30,
    marginTop: 10
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
  }
}));
export default useStyles;
