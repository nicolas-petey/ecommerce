import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { OrderDto } from 'src/model/DTO/orderDto';
import { Order } from 'src/model/order';
import { Status } from 'src/model/status';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  //routerOrder.post("", orderController.createOrder);
// routerOrder.get("/:id", orderController.getOrderById);
// routerOrder.put("/:id", orderController.modifyStatusOrder);

  @Get(':id')
  async getAllOrders(@Param('id') id: string): Promise<OrderDto> {
    return this.orderService.getOrderById(id);
  }

  @Post()
  async createOrder(@Body() createOrderDto: Order): Promise<OrderDto> {
    return this.orderService.createOrder(createOrderDto);
  }

  @Put(':id')
  async modifyOrder(@Param('id') id: string, @Body() status: Status): Promise<OrderDto> {
    return this.orderService.modifyOrder(id, status);
  }
}