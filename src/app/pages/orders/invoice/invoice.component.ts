import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule, MatButtonModule,MatIconModule],
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {
invoice = {
    billNo: 'ORD_1001',
    date: 'Oct 25, 2025',
    delivery: 'Thu Jan 16',

    customer: {
      name: 'Dinesh Bhagat',
      address: 'Garra - 481331',
      email: 'dineshbhagatpl@gmail.com',
      phone: '8600245120'
    },

    items: [
      {
        name: 'Shoes for mens casuals',
        category: 'Footwear',
        variant: 'Yellow (M)',
        qty: 1,
        price: 2000,
        discount: 200,
        total: 1800,
        image: 'assets/shoes.png' // replace with your image
      }
    ],

    subtotal: 2000,
    discount: 200,
    grandTotal: 1800,

    payment: {
      method: 'Razorpay',
      transactionId: 'pay_NqF64p2h3v4M8'
    }
  };
ngOnInit(){
  this.invoice
}
  printInvoice() {
    window.print();
  }
}
