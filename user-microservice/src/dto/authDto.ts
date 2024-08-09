export interface RegisterDto {
    idUser: string;
    username: string;
    email: string;
    password: string;
    name: string;
    lastName: string;
  }
  
  export interface LoginDto {
    email: string;
    password: string;
  }