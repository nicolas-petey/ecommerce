import { Injectable } from '@nestjs/common';
import { OrderDto } from 'src/model/DTO/orderDto';
import { Order } from 'src/model/order';
import { Status } from 'src/model/status';

@Injectable()
export class OrderService {
  // Add your service methods here

  //routerOrder.post("", orderController.createOrder);
// routerOrder.get("/:id", orderController.getOrderById);
// routerOrder.put("/:id", orderController.modifyStatusOrder);

  

  async getOrderById(id: string): Promise<OrderDto> {
    const ids = id;
    const response = await fetch(`http://localhost:8080/api/orders/${ids}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch order');
    }
    const order = await response.json();

    return order as OrderDto;
  }

  async createOrder(orderItem: Order): Promise<OrderDto> {
    
    const response = await fetch(`http://localhost:8080/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderItem),
    });
    if (!response.ok) {
      throw new Error('Failed to add order');
    }
    const order = await response.json();

    return order as OrderDto;
  }

  async modifyOrder(id: string, statusItem: Status): Promise<OrderDto> {
    
    const response = await fetch(`http://localhost:8080/api/orders/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(statusItem),
    });
    if (!response.ok) {
      throw new Error('Failed to modify order');
    }
    const order = await response.json();

    return order as OrderDto;
  }
}