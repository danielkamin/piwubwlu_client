import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { getAccessToken, getRoles } from '../utils/api/accessToken';
import { UserProvider } from '../context/UserContext';
import { AlertProvider, AlertType } from '../context/AlertContext';
import MainLayout from '../containers/Layouts/Main';
import ProfileLayout from '../containers/Layouts/Main/Profile';
import ProtectedRoute from './Routes/ProtectedRoute';
import {
  HomePage,
  Login,
  Register,
  RequestNewPassword,
  ResetPassword,
  PrivacyPolicy,
  UpdateProfile,
  ChangePassword,
  MyReservations,
  DeleteAccount,
  Labs,
  Machines,
  Workshops,
  Employees,
  EmployeeDetails,
  LabDetails,
  MachineDetails,
  WorkshopDetails,
  ReservationDetails,
  ReservationSurvey
} from '../components/index';
import NotFound from './Routes/NotFound';
const MainSwitch: React.FC = () => {
  return (
    <Route>
      <AlertProvider defaultValue={{ isOpen: false, type: AlertType.error, message: '' }}>
        <UserProvider defaultValue={{ loggedIn: getAccessToken() === '' ? false : true, roles: getRoles() }}>
          <MainLayout>
            <Switch>
              <Route path='/' exact component={HomePage} />
              <Route path='/login' component={Login} />
              <ProtectedRoute path='/moje_konto' exact component={UpdateProfile} />
              <ProtectedRoute path='/moje_konto/zmiana_hasla' component={ChangePassword} />
              <ProtectedRoute path='/moje_konto/rezerwacje' component={MyReservations} />
              <ProtectedRoute path='/moje_konto/usun_konto' component={DeleteAccount} />
              <Route path='/rejestracja' component={Register} />
              <Route path='/regulamin' component={PrivacyPolicy} />
              <Route path='/nowe_haslo/:token' component={ResetPassword} />
              <Route path='/reset_hasla' component={RequestNewPassword} />
              <Route path='/laboratoria' exact component={Labs} />
              <Route path='/laboratoria/:id' component={LabDetails} />
              <Route path='/maszyny' exact component={Machines} />
              <Route path='/maszyny/:id' component={MachineDetails} />
              <Route path='/pracownie' exact component={Workshops} />
              <Route path='/pracownie/:id' component={WorkshopDetails} />
              <Route path='/kadra' exact component={Employees} />
              <Route path='/kadra/:id' component={EmployeeDetails} />

              <ProtectedRoute path='/rezerwacje/:id' exact component={ReservationDetails} />
              <ProtectedRoute path='/rezerwacje/:id/ankieta' component={ReservationSurvey} />
              <Route component={NotFound} />
            </Switch>
          </MainLayout>
        </UserProvider>
      </AlertProvider>
    </Route>
  );
};
export default MainSwitch;
