import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { getAccessToken, getRoles } from '../utils/api/accessToken';
import { UserProvider } from '../context/UserContext';
import { AlertProvider, AlertType } from '../context/AlertContext';
import MainLayout from '../containers/Layouts/Main';
import ProfileLayout from '../containers/Layouts/Main/Profile';
import ProtectedRoute from './Routes/ProtectedRoute';
const MainSwitch: React.FC = () => {
  return (
    <Route>
      <AlertProvider defaultValue={{ isOpen: false, type: AlertType.error, message: '' }}>
        <UserProvider defaultValue={{ loggedIn: getAccessToken() === '' ? false : true, roles: getRoles() }}>
          <MainLayout>
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/login' component={Login} />
              <Route path='/moje_konto/:path?' exact>
                <ProfileLayout>
                  <Switch>
                    <ProtectedRoute path='/moje_konto' exact component={MyProfile} />
                    <ProtectedRoute path='/moje_konto/zmiana_hasla' component={ChangePassword} />
                    <ProtectedRoute path='/moje_konto/rezerwacje' component={MyReservation} />
                    <ProtectedRoute path='/moje_konto/usun_konto' component={DeleteAccount} />
                  </Switch>
                </ProfileLayout>
              </Route>

              <Route path='/rejestracja' component={Register} />
              <Route path='/regulamin' component={Regulations} />
              <Route path='/nowe_haslo/:token' component={NewPassword} />
              <Route path='/reset_hasla' component={ResetPassword} />
              <Route path='/laboratoria' exact component={DisplayLabs} />
              <Route path='/laboratoria/:id' component={LabDetails} />
              <Route path='/maszyny' exact component={DisplayMachines} />
              <Route path='/maszyny/:id' component={MachineDetails} />
              <Route path='/pracownie' exact component={DisplayWorkshops} />
              <Route path='/pracownie/:id' component={WorkshopDetails} />
              <Route path='/kadra' exact component={DisplayEmployees} />
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
