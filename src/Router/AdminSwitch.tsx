import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { getAccessToken, getRoles } from '../utils/api/accessToken';
import { UserProvider } from '../context/UserContext';
import { AlertProvider, AlertType } from '../context/AlertContext';
import AdminRoute from './Routes/AdminRoute';
import Unauthorized from './Routes/Unauthorized';
import AdminLayout from '../containers/Layouts/Admin';

const AdminSwitch: React.FC = () => {
  return (
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
        </UserProvider>
      </AlertProvider>
    </Route>
  );
};
export default AdminSwitch;
