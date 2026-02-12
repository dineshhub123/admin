import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-shipping-label',
  standalone: true,
  imports: [CommonModule, MatButtonModule,MatIconModule],
  templateUrl: './shipping-label.component.html',
  styleUrls: ['./shipping-label.component.css']
})
export class ShippingLabelComponent {

  label = {
    orderId: 'ORD_1001',
    qrCode: 'assets/img/ruralx_qr.jpg', // generate later if needed
    customer: {
      name: 'Dinesh Bhagat',
      address: 'Garra - 481001',
      city: 'Warasioni',
      state: 'Madhya Pradesh',
      country: 'India',
      phone: '+91 8600245120',
      email: 'dineshbhagatpl@gmail.com'
    }
  };

  printLabel() {
    window.print();
  }
}
