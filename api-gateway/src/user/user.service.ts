import { Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from 'src/model/authDto';

@Injectable()
export class UserService {

  //   router.post('/register', register);
// router.post('/login', login);
// router.get('/users', getAllUsers);
// router.get('/users/:idUser', getUserById);

  // Your code here
  async register(auth: RegisterDto) {
    const response = await fetch(`http://localhost:3000/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(auth)
    });
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      // Process the data
      return data;
    } else {
      const error = await response.text();
      // Handle the error
      return new Error(error);
    }

  }

  async login(auth: LoginDto) {
    const response = await fetch(`http://localhost:3000/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(auth)
    });
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      // Process the data
      return data;
    } else {
      const error = await response.text();
      // Handle the error
      return new Error(error);
    }
  }

  async getAllUsers() {
    return 'getAllUsers';
  }

  async getUserById() {
    return 'getUserById';
  }
}