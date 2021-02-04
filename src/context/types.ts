import {AlertType} from './AlertContext'
export interface ContextInterface {
    changeState: (newState: boolean, newRoles: string[]) => void;
    loggedIn?: boolean;
    roles?: string[];
  }
 export interface Props {
    children?: any;
    defaultValue: { loggedIn: boolean; roles: string[] };
  }


export interface AlertInterface{
  openAlert:(type:AlertType,message:string)=>void;
}