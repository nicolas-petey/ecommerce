import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { LoginDto, RegisterDto } from 'src/model/authDto';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
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
    const token = await this.service.login(loginDto);
    return { access_token: token };
    
  }

  @Get()
  async getAllUsers(@Query() query: any) {
    const userResponse = await this.service.getAllUsers(query);
    return userResponse;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string, @Query() query: any) {
    const userResponse = await this.service.getUserById(query, id);
    return userResponse;
  }
}