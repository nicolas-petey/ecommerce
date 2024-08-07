export interface UserDto {
    idUser: string;
    email: string;
    name: string | null;
    lastName: string | null;
  }

export interface UpdateUserDto {
    email? : string;
    name?: string;
    lastName?: string;
    password?: string;
    phone?: string;
  }
