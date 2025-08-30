// models/order.model.ts
export interface Order {
  id: string;
  productImage: string;
  productName: string;
  productMRP: number;
  productPrice: number;
  productDiscount: number;
  buyTime: Date;
  quantity: number;
  category: string;
  deliveryDate: Date;
  userFirstName: string;
  userLastName: string;
  userPhone: string;
  userEmail: string;
  userAddress: string;
  userPincode: string;
}