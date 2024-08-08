import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LoginDto, RegisterDto } from 'src/model/authDto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

  constructor(private service: UserService) {}

  @Post('login')
  async loginUser(@Body() loginDto: LoginDto) {
    const userResponse = await this.service.login(loginDto);
    return userResponse;
  }

  @Get()
  getAllUsers() {
    // Logic to get all users
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    // Logic to get a user by ID
  }

  @Post()
  registerUser(@Body() user: RegisterDto) {
    const userResponse = this.service.register(user);
    return userResponse;
  }

  // @Put(':id')
  // updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
  //   // Logic to update a user
  // }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    // Logic to delete a user
  }
}