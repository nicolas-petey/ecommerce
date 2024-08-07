import express from "express";
import { orderController } from "../controller/orderController";

export const routerOrder = express.Router();

routerOrder.post("", orderController.createOrder);
routerOrder.get("/:id", orderController.getOrderById);
routerOrder.put("/:id", orderController.modifyStatusOrder);
