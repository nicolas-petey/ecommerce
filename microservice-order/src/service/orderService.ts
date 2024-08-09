import type { OrderDto } from "../model/DTO/orderDto";
import type { Order } from "../model/order";
import type { Product } from "../model/product";
import type { Status } from "../model/status";
import {
  createOrder as createOrder_repository,
  getOrderById as getOrderById_repository,
  modifyStatusOrder as modifyStatusOrder_repository,
} from "../repository/orderRepository";
import { getProductById } from "../repository/productRepository";

export async function getOrderById(id: string): Promise<Order | Error> {
  try {
    const order = await getOrderById_repository(id);
    try {
      const products: Product[] = await Promise.all(
        order.ProductOnOrder.map(async (productOnOrder: Product) => {
          const product: Product = await getProductById(
            productOnOrder.idProduct
          );
          return {
            idProduct: product.idProduct,
            name: product.name,
            price: product.price,
            category: product.category,
            quantity: productOnOrder.quantity,
          };
        })
      );

      return {
        idOrder: order.idOrder as string,
        idUser: order.idUser as string,
        dateOrder: order.dateOrder,
        totalOrder: order.totalOrder as number,
        statusOrder: order.statusOrder as string,
        products: products,
      };
    } catch (err) {
      return {
        idOrder: order.idOrder as string,
        idUser: order.idUser as string,
        dateOrder: order.dateOrder,
        totalOrder: order.totalOrder as number,
        statusOrder: order.statusOrder as string,
        products: [],
      };
    }
  } catch (err) {
    console.error(err);
    return new Error("Error getting order");
  }
}

export async function createOrder(order: Order): Promise<OrderDto | Error> {
  try {
    const newOrder = await createOrder_repository(order);
    try {
      return newOrder;
    } catch (err) {
      console.error(err);
      return {
        idOrder: order.idOrder,
        idUser: order.idUser,
        dateOrder: order.dateOrder,
        totalOrder: order.totalOrder,
        statusOrder: order.statusOrder,
        products: [],
      };
    }
  } catch (err) {
    console.error(err);
    return new Error("Error creating order");
  }
}

export async function modifyStatusOrder(
  id: string,
  status: Status
): Promise<OrderDto | Error> {
  try {
    const newOrder = await modifyStatusOrder_repository(id, status);
    if (newOrder instanceof Error) {
      throw newOrder;
    }
    return newOrder;
  } catch (err) {
    console.error(err);
    return new Error("Error updating status");
  }
}
