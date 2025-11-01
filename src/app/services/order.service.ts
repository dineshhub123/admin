import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = [
    {
      id: 'ORD_1001',
      status: 'Processing',
      orderDate: 'Oct 25, 2025, 10:15:00 AM',
      deliveryDate: 'Thu Jan 16',
      totalAmount: 1800,
      user: {
        name: 'Dinesh Bhogat',
        email: 'dineshbhogatbpl@gmail.com',
        phone: '8600245120',
        address: 'Garra - 481001'
      },
      items: [
        {
          productName: 'Shoes for mens casuals',
          variant: 'Converse/Style',
          size: 'M',
          color: 'Yellow',
          quantity: 1,
          price: 1800,
          discount: 200
        }
      ],
      payment: {
        method: 'Razorpay',
        status: 'Paid',
        transactionId: 'pay_NetR&eja2h3v9t8'
      }
    },
    {
      id: 'ORD_1002',
      status: 'Delivered',
      orderDate: 'Oct 20, 2025, 02:30:00 PM',
      deliveryDate: 'Oct 23, 2025',
      totalAmount: 2500,
      user: {
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@example.com',
        phone: '9876543210',
        address: 'Mumbai - 400001'
      },
      items: [
        {
          productName: 'Wireless Headphones',
          variant: 'Bluetooth 5.0',
          size: 'One Size',
          color: 'Black',
          quantity: 1,
          price: 2500,
          discount: 300
        }
      ],
      payment: {
        method: 'Credit Card',
        status: 'Paid',
        transactionId: 'pay_AbC123xyz789'
      }
    }
  ];

  getOrders(): Order[] {
    return this.orders;
  }

  getOrderById(orderId: string): Order | undefined {
    return this.orders.find(order => order.id === orderId);
  }
}