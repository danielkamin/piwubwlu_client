import {ReservationState} from '../Shared/types'
export interface IUser {
    id?:number;
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    repeatPassword:string;
    setEmployee:boolean;
}

export interface IGuest extends IUser{
    isVerified:boolean;
}

export interface Employee {
    departmentId:number;
}

export interface IWorkshop {
    id?:number;
    name: string;
    english_name: string;
    room_number: string;
    labId: number;
    typeId: number;
    imagePath:string;
}

export interface WorkshopType {
    id?:number;
    name: string;
    english_name: string;
}

export interface IMachine {
    id?:number;
    name: string;
    english_name: string;
    timeUnit:string;
    maxUnit:number;
    workshopId: number;
    machineState:boolean;
}

export interface ILab {
    id?:number;
    name: string;
    english_name: string;
    employeeId?:number;
}

export interface IReservation {
    id:number;
    machineId:number;
    start_date:string;
    end_date:string;
    state:ReservationState;
}

export interface IDepartment {
    id?:number;
    name: string;
    english_name: string;
}

export const TimeUnit = {
    15:'15',30:'30',45:'45',60:'60'
  }
export interface ILogin {
    name: string;
    password: string;
  }
  