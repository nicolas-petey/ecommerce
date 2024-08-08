import type { Product } from "../product";

export interface OrderDto {
  ProductOnOrder?: any;
  idOrder?: String;
  idUser: String;
  dateOrder: Date;
  totalOrder: Number;
  statusOrder: String;
  products: Product[];
}
