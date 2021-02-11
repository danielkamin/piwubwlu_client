import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { getAccessToken, getRoles } from '../utils/api/accessToken';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import AdminLayout from '../containers/Layouts/Admin';
import MainLayout from '../containers/Layouts/Main';
import DateFnsUtils from '@date-io/date-fns';
import { UserProvider } from '../context/UserContext';
import { AlertProvider, AlertType } from '../context/AlertContext';
import AdminRoute from './Routes/AdminRoute';
import ProtectedRoute from './Routes/ProtectedRoute';
import Unauthorized from './Routes/Unauthorized';
import plLocale from 'date-fns/locale/pl';
import AdminSwitch from './AdminSwitch';
import MainSwitch from './MainSwitch';
const Routes: React.FC = () => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={plLocale}>
      <Router>
        <Switch>
          <AdminSwitch />
          <MainSwitch />
        </Switch>
      </Router>
    </MuiPickersUtilsProvider>
  );
};
export default Routes;
