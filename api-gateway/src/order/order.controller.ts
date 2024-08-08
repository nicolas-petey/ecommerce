import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // @Get()
  // async getAllOrders(): Promise<Order[]> {
  //   return this.orderService.getAllOrders();
  // }

  // @Post()
  // async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
  //   return this.orderService.createOrder(createOrderDto);
  // }
}