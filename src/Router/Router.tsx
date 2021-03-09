import React from 'react';
import {
  ReadDepartments,
  ReadEmployees,
  ReadGuests,
  ReadLabs,
  ReadMachines,
  ReadReservations,
  ReadWorkshopTypes,
  ReadWorkshops,
  NewDepartment,
  NewLab,
  NewMachine,
  NewWorkshop,
  NewWorkshopType,
  UpdateDepartment,
  UpdateEmployee,
  UpdateGuest,
  UpdateLab,
  UpdateMachine,
  UpdateWorkshop,
  UpdateWorkshopType,
  AdminHome,
  AdminLogin,
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
  ReservationSurvey,
  ResourceSearch,
  NewDegree,
  ReadDegrees,
  UpdateDegree
} from '../components/index';
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
import NotFound from './Routes/NotFound';
import ProfileLayout from '../containers/Layouts/Main/Profile';
const Routes: React.FC = () => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={plLocale}>
      <Router>
        <Switch>
          <Route path='/admin/:path?/:id?' exact>
            <AlertProvider defaultValue={{ isOpen: false, type: AlertType.error, message: '' }}>
              <UserProvider defaultValue={{ loggedIn: getAccessToken() === '' ? false : true, roles: getRoles() }}>
                <AdminLayout>
                  <Switch>
                    <AdminRoute path='/admin' exact component={AdminHome} />
                    <Route path='/admin/login' exact component={AdminLogin} />
                    <AdminRoute path='/admin/workshops' exact component={ReadWorkshops} />
                    <AdminRoute path='/admin/new_workshop' exact component={NewWorkshop} />
                    <AdminRoute path='/admin/update_workshop/:id' exact component={UpdateWorkshop} />
                    <AdminRoute path='/admin/labs' exact component={ReadLabs} />
                    <AdminRoute path='/admin/new_lab' exact component={NewLab} />
                    <AdminRoute path='/admin/update_lab/:id' exact component={UpdateLab} />
                    <AdminRoute path='/admin/employees' exact component={ReadEmployees} />
                    <AdminRoute path='/admin/machines' exact component={ReadMachines} />
                    <AdminRoute path='/admin/new_machine' exact component={NewMachine} />
                    <AdminRoute path='/admin/update_machine/:id' exact component={UpdateMachine} />
                    <AdminRoute path='/admin/workshop_types' exact component={ReadWorkshopTypes} />
                    <AdminRoute path='/admin/new_workshop_type' exact component={NewWorkshopType} />
                    <AdminRoute path='/admin/update_workshop_type/:id' exact component={UpdateWorkshopType} />
                    <AdminRoute path='/admin/departments' exact component={ReadDepartments} />
                    <AdminRoute path='/admin/update_department/:id' exact component={UpdateDepartment} />
                    <AdminRoute path='/admin/new_department' exact component={NewDepartment} />
                    <AdminRoute path='/admin/new_degree' exact component={NewDegree} />
                    <AdminRoute path='/admin/degrees' exact component={ReadDegrees} />
                    <AdminRoute path='/admin/update_degree/:id' exact component={UpdateDegree} />
                    <AdminRoute path='/admin/guests' exact component={ReadGuests} />
                    <AdminRoute path='/admin/update_guest/:id' component={UpdateGuest} />
                    <AdminRoute path='/admin/update_employee/:id' component={UpdateEmployee} />
                    <AdminRoute path='/admin/machine/:id' exact component={MachineDetails} />
                    <AdminRoute path='/admin/workshop/:id' exact component={WorkshopDetails} />
                    <AdminRoute path='/admin/reservation/:id' exact component={ReservationDetails} />
                    <AdminRoute path='/admin/lab/:id' exact component={LabDetails} />
                    <AdminRoute path='/admin/reservations' exact component={ReadReservations} />
                  </Switch>
                </AdminLayout>
              </UserProvider>
            </AlertProvider>
          </Route>
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
                    <Route path='/szukaj' component={ResourceSearch} />
                    <ProtectedRoute path='/rezerwacje/:id' exact component={ReservationDetails} />
                    <ProtectedRoute path='/rezerwacje/:id/ankieta' component={ReservationSurvey} />
                    <Route component={NotFound} />
                  </Switch>
                </MainLayout>
              </UserProvider>
            </AlertProvider>
          </Route>
        </Switch>
      </Router>
    </MuiPickersUtilsProvider>
  );
};
export default Routes;
