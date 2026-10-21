import { Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
//import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
  //imports: [MatDialogModule],
  //standalone: true,

})
export class InvoiceComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  imageBaseUrl = environment.imageBaseUrl


subtotal = 0;
totalDiscount = 0;
totalCgst = 0;
totalSgst = 0;
grandTotal = 0;
amountInWords: string = '';
ngOnInit() {
  this.calculateInvoice();
}

calculateInvoice() {

  // this.subtotal = 0;
  // this.totalDiscount = 0;
  // this.totalCgst = 0;
  // this.totalSgst = 0;
  // this.grandTotal = 0;

  this.data.items.forEach((item: any) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.quantity) || 0;
    const mrp = Number(item.mrp) || 0;
    // ✅ Default GST to 0 if not present
    const gstRate = Number(item.gst_rate) || 0;
    const taxableAmount = price * qty;
    const discountAmount = (mrp - price) * qty;
    const gstAmount = taxableAmount * gstRate / 100;
    const cgst = gstAmount / 2;
    const sgst = gstAmount / 2;
    // Attach calculated values
    item.gst_rate = gstRate; // ensures always numeric
    item.taxableAmount = taxableAmount;
    item.cgst = cgst;
    item.sgst = sgst;
    item.gstAmount = gstAmount;
    item.totalWithTax = taxableAmount + cgst + sgst;

    // Summary
    this.subtotal += taxableAmount;
    this.totalDiscount += discountAmount;
    this.totalCgst += cgst;
    this.totalSgst += sgst;
  });

  this.grandTotal = this.subtotal + this.totalCgst + this.totalSgst;
  this.amountInWords = this.convertNumberToWords(this.grandTotal);

} 

convertNumberToWords(amount: number): string {

  if (!amount) return 'Rupees Zero Only';

  const ones = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six',
    'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve',
    'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
    'Seventeen', 'Eighteen', 'Nineteen'
  ];

  const tens = [
    '', '', 'Twenty', 'Thirty', 'Forty',
    'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
  ];

  const numToWords = (num: number): string => {
    if (num < 20) return ones[num];
    if (num < 100)
      return tens[Math.floor(num / 10)] +
        (num % 10 ? ' ' + ones[num % 10] : '');
    if (num < 1000)
      return ones[Math.floor(num / 100)] +
        ' Hundred' +
        (num % 100 ? ' ' + numToWords(num % 100) : '');
    if (num < 100000)
      return numToWords(Math.floor(num / 1000)) +
        ' Thousand' +
        (num % 1000 ? ' ' + numToWords(num % 1000) : '');
    if (num < 10000000)
      return numToWords(Math.floor(num / 100000)) +
        ' Lakh' +
        (num % 100000 ? ' ' + numToWords(num % 100000) : '');
    return numToWords(Math.floor(num / 10000000)) +
      ' Crore' +
      (num % 10000000 ? ' ' + numToWords(num % 10000000) : '');
  };

  return 'Rupees ' + numToWords(Math.floor(amount)) + ' Only';
}
printInvoice() {
    window.print();
  }


}
