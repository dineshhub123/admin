// // models/order.model.ts
// export interface Order {
//   order_id: string;
//   user: {
//     user_first_name: string;
//     user_last_name: string;
//     user_email: string;
//     user_phone: string;
//     user_address: string;
//     user_pincode: string;
//   };
//   items: Array<{
//     product_id?: string;
//     product_name: string;
//     category: string;
//     sub_category: string;
//     quantity: number;
//     product_price: number;
//     product_mrp_price: number;
//     product_discount: number;
//     variant: { color: string; colorCode: string; size: string };
//     image_url: string;
//   }>;
//   payment: {
//     method: string;
//     status: string;
//     transaction_id: string;
//   };
//   delivery_date: string;
//   order_status: string;
//   order_date: Date | string;
//   total_amount: number;
// }




export interface Order {
  id: string;
  status: string;
  orderDate: string;
  deliveryDate: string;
  totalAmount: number;
  user: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: OrderItem[];
  payment: {
    method: string;
    status: string;
    transactionId: string;
  };
}

export interface OrderItem {
  productName: string;
  variant: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  discount: number;
}