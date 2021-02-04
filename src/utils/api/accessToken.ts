import jwt_decode from 'jwt-decode';
let accessToken = '';

let role = ['', '', ''];
interface token {
  id: number;
  role: string[];
  iat: number;
  exp: number;
}

export const setAccessToken = (s: string) => {
  accessToken = s;
};

export const getAccessToken = () => {
  return accessToken;
};

export const setRoles = (s: string) => {
  if (s === '') role = [''];
  else {
    const temp_token: token = jwt_decode(s);
    role = temp_token.role;
  }
};
export const getRoles = (): string[] => {
  return role;
};
