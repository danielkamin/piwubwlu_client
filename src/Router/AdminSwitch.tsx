import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { getAccessToken, getRoles } from '../utils/api/accessToken';
import { UserProvider } from '../context/UserContext';
import { AlertProvider, AlertType } from '../context/AlertContext';
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
  LabDetails,
  MachineDetails,
  WorkshopDetails,
  ReservationDetails
} from '../components/index';
import AdminRoute from './Routes/AdminRoute';
import AdminLayout from '../containers/Layouts/Admin';

const AdminSwitch: React.FC = () => {
  return (
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
  );
};
export default AdminSwitch;
