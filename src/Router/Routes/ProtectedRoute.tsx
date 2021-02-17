import React from 'react';
import { getAccessToken, getRoles } from '../../utils/api/accessToken';
import { logout } from '../../components/Main/Auth/Logout/logout';
import { Route, Redirect } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { AlertType, useAlertContext } from '../../context/AlertContext';
interface Props {
  component: React.FC;
  path: string;
  exact?: boolean;
}

const ProtectedRoute: React.FC<Props> = (props) => {
  const context = useUserContext();
  const alertContext = useAlertContext();
  if (context?.loggedIn === false) {
    logout();
    context.changeState(false, []);
    // alertContext.openAlert(AlertType.warning, 'Nieautoryzowany dostęp! Spróbuj się zalogować');
    return <Redirect to='/login' />;
  }
  return <Route {...props} />;
};

export default ProtectedRoute;
