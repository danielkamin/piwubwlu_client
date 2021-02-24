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
type Employee = {
    information:string;
    title:string;
    Department:Department;
    Degree:Degree;
    telephone:string;
    room:string;
}
export type Degree = {
    id:number;
    name:string;
}
export type Department = {
    id:number;
    name:string;
    english_name:string;
}
export interface NewPasswordForm {
    password:string;
    repeatPassword:string;
}
export  interface RegisterValues {
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
    email?:string;
    Employee?:Employee;
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
export interface IEmployee extends IProfile{
    picturePath?:string;
    id:number;
}