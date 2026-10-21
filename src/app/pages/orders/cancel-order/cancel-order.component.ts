import { Component, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cancel-order',
  templateUrl: './cancel-order.component.html',
  styleUrls: ['./cancel-order.component.css']
})
export class CancelOrderComponent {
constructor(private apiService:ApiService){}
  @ViewChild(MatPaginator) paginator!: MatPaginator;

displayedColumns: string[] = [
  'index',
  'order_id',
  'customer_name',
  'mobile',
  'payment_method',
  'total_amount',
  'status',
  'cancel_date',
  'action'
];

  dataSource = new MatTableDataSource<any>([]);

ngOnInit(){
  this.fetchCancelOrders();
  this.dataSource.paginator = this.paginator;
  this.paginator.pageSize = 5;

}
// updateRefundStatus(row: any, refundStatus: string): void {

//   const payload = {
//     order_id: row.order_id,
//     refund_status: refundStatus
//   };

//  this.apiService.updateCancelOrderStatus(payload).subscribe({
//     next: (res: any) => {
//       if (res.status) {
//         row.refund_status = refundStatus;
//       } 
//     },
//     error: (err) => {
//       console.error(err);
//       alert('Failed to update refund status');
//     }
//   });
// }

updateRefundStatus(row: any, refundStatus: string): void {

  // Prevent duplicate clicks
  if (row.refundLoading) {
    return;
  }

  // COD orders do not require online refunds
  if (row.payment_method !== 'ONLINE') {
    return;
  }

  // Only allow starting a refund from pending/failed
  if (
    refundStatus === 'processing' &&
    !['pending', 'failed'].includes(row.refund_status)
  ) {
    alert('Refund cannot be initiated from the current status.');
    return;
  }

  // Do not allow manual completion
  if (refundStatus === 'completed') {
    alert('Refund can be completed only after Razorpay confirms success.');
    return;
  }

  const confirmed = confirm(
    `Start refund for Order ${row.order_id} of ₹${row.total_amount}?`
  );

  if (!confirmed) {
    return;
  }

  const payload = {
    order_id: row.order_id,
    refund_status: refundStatus
  };

  row.refundLoading = true;

  this.apiService.updateCancelOrderStatus(payload).subscribe({
    next: (res: any) => {

      if (res.status) {
        // Use the status returned by the backend if available
        row.refund_status = res.refund_status || refundStatus;
      } else {
        alert(res.message || 'Unable to initiate refund.');
      }

      row.refundLoading = false;
    },

    error: (err: any) => {
      console.error('Refund update error:', err);

      row.refundLoading = false;

      alert(
        'Refund status could not be verified. Check Razorpay and the database before retrying.'
      );
    }
  });
}

fetchCancelOrders(){
 this.apiService.getCancelOrderData().subscribe((res:any)=>{
   if(res.status){
        this.dataSource.data = res.data;
        this.dataSource.paginator = this.paginator;
      
      }
  console.log("res cancel",res)
 })
}
}
