import type { Order } from "../model/order";
import type { Status } from "../model/status";
import {
  createOrder as createOrder_service,
  getOrderById as getOrderById_service,
  modifyStatusOrder as modifyStatusOrder_service,
} from "../service/orderService";

export const orderController = {
  async getOrderById(req: any, res: any) {
    const id: string = req.params.id;
    try {
      return res.json(await getOrderById_service(id));
    } catch (err) {
      console.error(err);
      return res.status(500).send("Error getting order");
    }
  },

  async createOrder(req: any, res: any) {
    const order: Order = req.body;
    try {
      return res.json(await createOrder_service(order));
    } catch (err) {
      console.error(err);
      return res.status(500).send("Error creating order");
    }
  },

  async modifyStatusOrder(req: any, res: any) {
    const status: Status = req.body;
    const id: string = req.params.id;
    try {
      return res.json(await modifyStatusOrder_service(id, status));
    } catch (err) {
      console.error(err);
      return res.status(500).send("Error updating status");
    }
  },
};
