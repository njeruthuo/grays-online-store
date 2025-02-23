import { orderApi } from "./orderApi";

export { orderApi };

interface TransactionType {
  amount: string;
  checkout_request_id: string;
  created_at: string;
  id: number;
  merchant_request_id: number;
  phone_number: string;
  receipt_number: string;
  result_code: number;
  result_description: string;
  transaction_date: Date | string;
}

interface ProductType {
  brand: number;
  category: number;
  description: string;
  id: number;
  name: string;
  price: string;
  stocked: boolean;
}

export interface OrderItemType {
  id: number;
  product: ProductType;
  price: string | number;
  quantity: number;
}

export interface OrderInterface {
  id: number;
  date_created: Date | string;
  transaction: TransactionType;
  order_items: OrderItemType[];
}
