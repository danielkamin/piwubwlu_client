import React from 'react';
import { logout } from '../../components/Main/Auth/Logout/logout';
import { Route, Redirect } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';

interface Props {
  component: React.FC;
  path: string;
  exact?: boolean;
}

const AdminRoute: React.FC<Props> = (props) => {
  const context = useUserContext();
  if (context?.loggedIn === false || context?.roles?.includes('ADMIN') === false) {
    logout();
    context.changeState(false, []);
    return <Redirect to='/admin/login' />;
  }
  return <Route {...props} />;
};

export default AdminRoute;
