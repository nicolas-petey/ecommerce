import {
  createOrder as createOrder_service,
  getOrderById as getOrderById_service,
} from "../service/orderService";

export const orderController = {
  async getOrderById(req: any, res: any) {
    const id = req.params.id;
    return res.json(await getOrderById_service(id));
  },

  async createOrder(req: any, res: any) {
    const order = req.body;
    return res.json(await createOrder_service(order));
  },
};
