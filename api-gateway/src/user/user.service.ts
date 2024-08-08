import { Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from 'src/model/authDto';
import { UserDto } from 'src/model/userDto';

@Injectable()
export class UserService {

  async register(auth: RegisterDto) {

     const url = `http://localhost:3000/api/register`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(auth)
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const error = await response.text();
      return new Error(error);
    }

  }

  async login(auth: LoginDto) {

    const url = `http://localhost:3000/api/login`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(auth)
    });
    if (response.ok) {
      const data = await response.json();
      return data.access_token;
    } else {
      const error = await response.text();
      return new Error(error);
    }
  }

  async getAllUsers(user: UserDto) {
    const queryParams = new URLSearchParams(user as any).toString();
    
    const url = `http://localhost:3000/api/users?${queryParams}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
        
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const error = await response.text();
      return new Error(error);
    }
  }

  async getUserById(user: UserDto, idUser: string) {
    
    const url = `http://localhost:3000/api/users/${idUser}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
        
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const error = await response.text();
      return new Error(error);
    }
  }

}