import type { PrismaPromise } from "@prisma/client";
import type { OrderDto } from "../model/DTO/orderDto";
import type { Order } from "../model/order";
import type { Product } from "../model/product";
import { prisma } from "../utils/client";

export function getAllOrders(): PrismaPromise<Order[]> {
  const orders: PrismaPromise<Order[]> = prisma.order.findMany();
  return orders;
}

export async function getOrderById(id: string): Promise<OrderDto> {
  const orders: any = await prisma.order.findFirst({
    where: {
      idOrder: id,
    },
    include: {
      ProductOnOrder: {
        include: {
          product: true,
        },
      },
    },
  });
  return orders;
}

export async function createOrder(order: Order) /* : Promise<OrderDto> */ {
  const newOrder = await prisma.order.create({
    data: {
      idUser: order.idUser,
      totalOrder: order.totalOrder,
      statusOrder: order.statusOrder,
    },
  });

  const products = (order.products ?? []).map(async (product: Product) => {
    const createdProduct = await prisma.product.create({
      data: {
        idProduct: product.idProduct,
        name: product.name,
        price: product.price,
        category: product.category,
      },
    });
    const productOnOrder = await prisma.productOnOrder.create({
      data: {
        quantity: product.quantity,
        idOrder: newOrder.idOrder,
        idProduct: product.idProduct,
      },
    });
  });

  const orderFinished = getOrderById(newOrder.idOrder);

  return orderFinished;
}
