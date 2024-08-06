import type { PrismaPromise } from "@prisma/client";
import type { OrderDto } from "../model/DTO/orderDto";
import type { Order } from "../model/order";
import type { Product } from "../model/product";
import type { Status } from "../model/status";
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
      ProductOnOrder: true,
    },
  });
  return orders;
}

export async function createOrder(order: Order): Promise<OrderDto> {
  const newOrder = await prisma.order.create({
    data: {
      idUser: order.idUser,
      totalOrder: order.totalOrder,
      statusOrder: order.statusOrder,
    },
  });

  const products = (order.products ?? []).map(async (product: Product) => {
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

export async function modifyStatusOrder(
  id: string,
  status: Status
): Promise<OrderDto | Error> {
  try {
    const newOrder: any = await prisma.order.update({
      where: {
        idOrder: id,
      },
      data: {
        statusOrder: status.status,
      },
      include: {
        ProductOnOrder: true,
      },
    });

    return newOrder;
  } catch (err) {
    console.error(err);
    return new Error("Error updating status");
  }
}
