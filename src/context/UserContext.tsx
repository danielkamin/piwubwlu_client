import React, { useState, useContext } from 'react';
import { Props, ContextInterface } from './types';
export const UserContext = React.createContext<ContextInterface>({ changeState: () => {}, loggedIn: false, roles: [] });
export const useUserContext = () => useContext(UserContext);
export const UserProvider: React.FC<Props> = (props) => {
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
  return <UserContext.Provider value={providerValue}>{props.children}</UserContext.Provider>;
};
