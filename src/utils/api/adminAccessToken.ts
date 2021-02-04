import jwt_decode from 'jwt-decode';
let adminAccessToken ='';
let role = ['', '', ''];
interface token {
    id: number;
    role: string[];
    iat: number;
    exp: number;
  }

  export const setAdminAccessToken = (s: string) => {
    adminAccessToken = s;
  };
  
  export const getAdminAccessToken = () => {
    return adminAccessToken;
  };
  
  export const setAdminRoles = (s: string) => {
    if (s === '') role = [''];
    else {
      const temp_token: token = jwt_decode(s);
      role = temp_token.role;
    }
  };
  export const getAdminRoles = (): string[] => {
    return role;
  };
    