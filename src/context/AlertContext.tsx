import React, { useContext, useState } from 'react';
import { AlertInterface } from './types';
import Alert from '@material-ui/lab/Alert';
import { Fade, Snackbar } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
export enum AlertType {
  error = 'error',
  warning = 'warning',
  info = 'info',
  success = 'success'
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2)
      }
    }
  })
);
interface AlertProp {
  isOpen: boolean;
  message?: string;
  type?: AlertType;
  handleClose: (event: React.SyntheticEvent | MouseEvent, reason?: string) => void;
}
export const GlobalAlert: React.FC<AlertProp> = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Snackbar open={props.isOpen} autoHideDuration={4000} TransitionComponent={Fade} onClose={props.handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={props.type} onClose={props.handleClose}>
          {console.log(props)}
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

interface Props {
  children?: any;
  defaultValue: { type?: AlertType; message?: string; isOpen: boolean };
}
export const AlertContext = React.createContext<AlertInterface>({ openAlert: () => {} });

export const useAlertContext = () => useContext(AlertContext);
export const AlertProvider: React.FC<Props> = (props) => {
  const [alertState, setAlertState] = useState(props.defaultValue);
  const handleOpenAlert = (typeVal: AlertType, messageVal: string) => {
    setAlertState({ type: typeVal, isOpen: true, message: messageVal });
  };
  const handleCloseAlert = (event: React.SyntheticEvent | MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertState({ isOpen: false, message: alertState.message, type: alertState.type });
  };
  const providerValue: AlertInterface = {
    openAlert: handleOpenAlert
  };
  return (
    <AlertContext.Provider value={providerValue}>
      <GlobalAlert isOpen={alertState.isOpen} type={alertState.type} message={alertState.message} handleClose={handleCloseAlert} />
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
