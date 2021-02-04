import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { getAccessToken, getRoles } from '../Helpers/accessToken';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {
  Register,
  MainLayout,
  AdminLayout,
  ProfileLayout,
  Login,
  Home,
  NotFound,
  Workshops,
  WorkshopTypes,
  Labs,
  Departments,
  NewMachine,
  NewWorkshop,
  NewLab,
  NewDepartment,
  NewWorkshopType,
  AdminLogin,
  Machines,
  GuestList,
  UpdateWorkshopType,
  UpdateDepartment,
  UpdateGuest,
  UpdateLab,
  UpdateMachine,
  UpdateWorkshop,
  Employees,
  MachineDetails,
  DepartmentDetails,
  WorkshopDetails,
  LabDetails,
  MyProfile,
  UpdateEmployee,
  ChangePassword,
  NewPassword,
  ResetPassword,
  DisplayEmployees,
  EmployeeDetails,
  DisplayWorkshops,
  DisplayMachines,
  DisplayLabs,
  MyReservation,
  Regulations,
  ReservationSurvey,
  ReservationDetails,
  ReservationList,
  DeleteAccount
} from '../Components';
import { UserProvider } from '../Components/Context/UserContext';
import { AlertProvider, AlertType } from '../Components/Context/AlertContext';
import Dashboard from '../Components/Home/Dashboard';
import AdminRoute from './Routes/AdminRoute';
import ProtectedRoute from './Routes/ProtectedRoute';
import Unauthorized from './Routes/Unauthorized';
import plLocale from 'date-fns/locale/pl';

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
                    <AdminRoute path='/admin' exact component={Dashboard} />
                    <Route path='/admin/login' exact component={AdminLogin} />
                    <AdminRoute path='/admin/workshops' exact component={Workshops} />
                    <AdminRoute path='/admin/new_workshop' exact component={NewWorkshop} />
                    <AdminRoute path='/admin/update_workshop/:id' exact component={UpdateWorkshop} />
                    <AdminRoute path='/admin/labs' exact component={Labs} />
                    <AdminRoute path='/admin/new_lab' exact component={NewLab} />
                    <AdminRoute path='/admin/update_lab/:id' exact component={UpdateLab} />
                    <AdminRoute path='/admin/employees' exact component={Employees} />
                    <AdminRoute path='/admin/machines' exact component={Machines} />
                    <AdminRoute path='/admin/new_machine' exact component={NewMachine} />
                    <AdminRoute path='/admin/update_machine/:id' exact component={UpdateMachine} />
                    <AdminRoute path='/admin/workshop_types' exact component={WorkshopTypes} />
                    <AdminRoute path='/admin/new_workshop_type' exact component={NewWorkshopType} />
                    <AdminRoute path='/admin/update_workshop_type/:id' exact component={UpdateWorkshopType} />
                    <AdminRoute path='/admin/departments' exact component={Departments} />
                    <AdminRoute path='/admin/update_department/:id' exact component={UpdateDepartment} />
                    <AdminRoute path='/admin/new_department' exact component={NewDepartment} />
                    <AdminRoute path='/admin/guests' exact component={GuestList} />
                    <AdminRoute path='/admin/update_guest/:id' component={UpdateGuest} />
                    <AdminRoute path='/admin/update_employee/:id' component={UpdateEmployee} />
                    <AdminRoute path='/admin/my_profile' exact component={MyProfile} />
                    <AdminRoute path='/admin/machine/:id' exact component={MachineDetails} />
                    <AdminRoute path='/admin/workshop/:id' exact component={WorkshopDetails} />
                    <AdminRoute path='/admin/department/:id' exact component={DepartmentDetails} />
                    <AdminRoute path='/admin/lab/:id' exact component={LabDetails} />
                    <AdminRoute path='/admin/reservations' exact component={ReservationList} />
                  </Switch>
                </AdminLayout>
                <Route exact path='/unauthorized' component={Unauthorized} />
              </UserProvider>
            </AlertProvider>
          </Route>

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
        </Switch>
      </Router>
    </MuiPickersUtilsProvider>
  );
};
export default Routes;
