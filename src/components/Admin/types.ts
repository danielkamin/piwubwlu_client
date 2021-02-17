import {ReservationState} from '../Shared/types'
type Employee = {
    id?:number,
    departmentId?:number
}

export interface IUser {
    id:number;
    firstName:string;
    lastName:string;
    email:string;
    password?:string;
    repeatPassword?:string;
    setEmployee:boolean;
}

export interface IGuest extends IUser{
    isVerified:boolean;
}

export interface IEmployee extends IUser {
    Employee:Employee
}

export interface IWorkshop {
    id:number;
    name: string;
    english_name: string;
    room_number: string;
    labId: number;
    typeId: number;
    imagePath?:string;
}

export interface IWorkshopType {
    id:number;
    name: string;
    english_name: string;
    symbol:string;
}

export interface IMachine {
    id:number;
    name: string;
    english_name: string;
    timeUnit:string;
    maxUnit:number;
    workshopId: number;
    machineState:boolean;
}

export interface ILab {
    id:number;
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
    id:number;
    name: string;
    english_name: string;
}

export const TimeUnit = {
    15:'15',30:'30',45:'45',60:'60'
  }
export interface ILogin {
    email: string;
    password: string;
  }
  