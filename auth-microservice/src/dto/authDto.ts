export interface RegisterDto {
    idUser: number;
    username: string;
    email: string;
    password: string;
    name: string;
    lastName: string;
  }
  
  export interface LoginDto {
    idUser: number;
    email: string;
    password: string;
  }