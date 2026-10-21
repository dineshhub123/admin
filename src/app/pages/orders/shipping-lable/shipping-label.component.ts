import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-shipping-label',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './shipping-label.component.html',
  styleUrls: ['./shipping-label.component.css']

})
export class ShippingLabelComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() { }

  print() {
    window.print();
  }

  printLabel() {
    window.print();
  }
}
