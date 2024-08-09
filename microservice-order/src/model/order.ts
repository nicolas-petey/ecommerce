import type { Product } from "./product";

export interface Order {
  idOrder?: string;
  idUser: string;
  dateOrder: Date;
  totalOrder: number;
  statusOrder: string;
  products?: Product[];
}
