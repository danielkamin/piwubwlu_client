import React, { useContext, useState } from 'react';
import { Props, ContextInterface } from './types';
export const AdminContext = React.createContext<ContextInterface>({ changeState: () => {}, loggedIn: false, roles: [] });
export const useAdminContext = () => useContext(AdminContext);
export const AdminProvider: React.FC<Props> = (props) => {
  const [isAuth, setIsAuth] = useState(props.defaultValue);
  function handleChangeState(newState: boolean, newRoles: string[]): void {
    setIsAuth({ loggedIn: newState, roles: newRoles });
  }
  const providerValue: ContextInterface = {
    changeState: handleChangeState,
    loggedIn: isAuth.loggedIn,
    roles: isAuth.roles
  };
  console.log(isAuth);
  return <AdminContext.Provider value={providerValue}>{props.children}</AdminContext.Provider>;
};
