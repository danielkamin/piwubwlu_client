export type Params = {
    id: string;
  };
  export interface ICard {
    id:number;
    name: string;
    english_name: string;
  }
  export interface IMediaCard extends ICard {
    imagePath: string;
  }
  export const Roles = {
    admin:'ADMIN',
    supervisor:'SUPERVISOR',
    employee:'EMPLOYEE',
    regular:'REGULAR'
  }
  