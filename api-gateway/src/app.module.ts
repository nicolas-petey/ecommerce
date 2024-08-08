import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AddressModule } from './address/address.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [UserModule, AddressModule, OrderModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
