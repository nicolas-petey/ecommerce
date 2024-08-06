import {
  createOrder as createOrder_repository,
  getOrderById as getOrderById_repository,
} from "../repository/orderRepository";

export async function getOrderById(id: string) /*: OrderDto*/ {
  const order = await getOrderById_repository(id);

  return {
    idOrder: order.idOrder,
    idUser: order.idUser,
    dateOrder: order.dateOrder,
    totalOrder: order.totalOrder,
    statusOrder: order.statusOrder,
    products: order.ProductOnOrder.map((productOnOrder: any) => ({
      idProduct: productOnOrder.product.idProduct,
      name: productOnOrder.product.name,
      price: productOnOrder.product.price,
      category: productOnOrder.product.category,
      quantity: productOnOrder.quantity,
    })),
  };
}

export async function createOrder(order: any) /*: OrderDto*/ {
  const newOrder = await createOrder_repository(order);

  return {
    idOrder: newOrder.idOrder,
    idUser: newOrder.idUser,
    dateOrder: newOrder.dateOrder,
    totalOrder: newOrder.totalOrder,
    statusOrder: newOrder.statusOrder,
    products: newOrder.ProductOnOrder.map((productOnOrder: any) => ({
      idProduct: productOnOrder.product.idProduct,
      name: productOnOrder.product.name,
      price: productOnOrder.product.price,
      category: productOnOrder.product.category,
      quantity: productOnOrder.quantity,
    })),
  };
}
