import React from 'react';
import { getAccessToken, getRoles } from '../Helpers/accessToken';
import { logout } from '../Components/Nav/Logout';
import { Route, Redirect } from 'react-router-dom';
import { useUserContext } from '../Components/Context/UserContext';
import { AlertType, useAlertContext } from '../Components/Context/AlertContext';
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
