import { Component } from '@angular/core';
import { Order } from 'src/app/models/order.model';


@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent {
displayedColumns: string[] = [
    'productImage', 
    'productName',
    'quantity',
    'productPrice',
    'deliveryDate',
    'status',
    'action'
  ];

  dataSource: Order[] = [
    {
      id: '1',
      productImage: 'assets/images/product1.jpg',
      productName: 'Wireless Headphones',
      productMRP: 2999,
      productPrice: 1999,
      productDiscount: 33,
      buyTime: new Date('2023-05-15'),
      quantity: 1,
      category: 'Electronics',
      deliveryDate: new Date('2023-05-20'),
      userFirstName: 'John',
      userLastName: 'Doe',
      userPhone: '9876543210',
      userEmail: 'john@example.com',
      userAddress: '123 Main St, City',
      userPincode: '400001'
    },
    // Add more sample orders as needed
  ];

  constructor() { }

  ngOnInit(): void {
  }

  viewOrderDetails(order: Order) {
    // Implement order details view logic
    console.log('View order:', order);
  }

  cancelOrder(order: Order) {
    // Implement cancel order logic
    console.log('Cancel order:', order);
  }
}
