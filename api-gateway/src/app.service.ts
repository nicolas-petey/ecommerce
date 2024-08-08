import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  
  constructor(@Inject('USER_SERVICE') private readonly userService: ClientProxy) {
    
  }

  pingServiceA() {
    return this.userService.send({ cmd: 'users' }, {});
  }
  
}
