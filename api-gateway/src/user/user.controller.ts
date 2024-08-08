import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { LoginDto, RegisterDto } from 'src/model/authDto';
import { UserService } from './user.service';
@Controller('users')
export class UserController {

  constructor(private service: UserService) { }

  @Post('register')
  registerUser(@Body() user: RegisterDto) {
    const userResponse = this.service.register(user);
    return userResponse;
  }

  @Post('login')
  async loginUser(@Body() loginDto: LoginDto) {
    const userResponse = await this.service.login(loginDto);
    return userResponse;
  }

  @Get()
  async getAllUsers(@Query() query: any) {
    const userResponse = await this.service.getAllUsers(query);
    return userResponse;
  }

  @Get(':id')
  async getUserById(@Param('id') id: string, @Query() query: any) {
    const userResponse = await this.service.getUserById(query, id);
    return userResponse;
  }
}