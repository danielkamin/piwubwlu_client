export enum ReservationState {
    PENDING='PENDING',ACCEPTED='ACCEPTED',DECLINED='DECLINED',FINISHED='FINISHED'
}
type Machine = {
    id:number,
    name:string,
    english_name:string,
    imagePath:string,
    Workshop:Workshop,
    maxUnit:number,
    timeUnit:string,
    machineState:boolean,
}
type Workshop = {
    id:number,
    name:string,
    english_name:string
}
type ReservationSurvey = {
    id:number;
    reservationId:number;
    comment:string;
}
export interface NewPasswordForm {
    password:string;
    repeatPassword:string;
}
export  interface RegisterValues {
      name: string;
      firstName:string;
      lastName:string;
      email: string;
      password: string;
      repeatPassword: string;
      acceptRegulations:boolean;
}
export interface LoginValues {
        email: string;
        password: string;
}
export interface IProfile {
    firstName:string;
    lastName:string;
    email:string;
    name:string;
    Employee:{
        information:string;
    }|null
}
export interface Reservation {
    id:string; 
    start_date:string;
    end_date:string;
    state:ReservationState;   
    Machine:Machine;
    ReservationSurvey:ReservationSurvey;
}
export interface ICardInfo {
    id:number;
    name: string;
    english_name: string;
    imagePath?: string;
}