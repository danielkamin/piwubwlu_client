

export enum ReservationState {
    PENDING='PENDING',ACCEPTED='ACCEPTED',DECLINED='DECLINED',FINISHED='FINISHED'
}
type Machine = {
  id:number,
  name:string,
  english_name:string,
  machine_state:boolean
}
type WorkshopType = {
  id:number,
  symbol:string,
  name:string,
  english_name:string
}
type User = {
    id:number,
    firstName:string,
    lastName:string
  }
type Employee = {
      id:number,
      departmentId:number,
      userId:number,
      User:User
  }
type Workshop = {
    id:number,
    name:string,
    english_name:string,
    room_number:number
  }
type ReservationSurvey = {
    id:number;
    reservationId:number;
    comment:string;
}
export interface ICardInfo {
    id:number;
    name: string;
    english_name: string;
    imagePath?: string;
}
export interface ILabDetails {
    id: number;
    name: string;
    english_name: string;
    employeeId:number;
    Employee:Employee;
    Workshops:Workshop[];
}
export interface IMachineDetails{
  name: string;
  english_name: string;
  timeUnit:string;
  maxUnit:number;
  workshopId: number | string;
  machineState:boolean;
  id:number;
  imagePath:string;
  Workshop:Workshop;
}

export interface Reservation {
  id:string; 
  start_date:string;
  end_date:string;
  state:ReservationState;   
  Machine:IMachineDetails;
  ReservationSurvey:ReservationSurvey;
}
export interface IReservationDetails extends Reservation{
    
  Employee:Employee;
}
export interface IWorkshopDetails {
  id:number;
  name: string;
  english_name: string;
  room_number: number | string;
  labId: number;
  typeId:number;
  imagePath:string;
  Employees:Employee[];
  Machines:Machine[];
  WorkshopType:WorkshopType;
}