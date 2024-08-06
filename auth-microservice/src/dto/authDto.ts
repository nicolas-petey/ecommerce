export interface RegisterDto {
    idUser: number;
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