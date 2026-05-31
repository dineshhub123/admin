import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-cancel-order',
  templateUrl: './cancel-order.component.html',
  styleUrls: ['./cancel-order.component.css']
})
export class CancelOrderComponent {
constructor(private apiService:ApiService){}
displayedColumns: string[] = [
  'order_id',
  'customer_name',
  'mobile',
  'payment_method',
  'total_amount',
  'status',
  'cancel_date',
  'action'
];

dataSource:any[]=[];

ngOnInit(){
  this.fetchCancelOrders();
}
updateRefundStatus(row: any, refundStatus: string): void {

  const payload = {
    order_id: row.order_id,
    refund_status: refundStatus
  };

 this.apiService.updateCancelOrderStatus(payload).subscribe({
    next: (res: any) => {
      if (res.status) {
        row.refund_status = refundStatus;
      } 
    },
    error: (err) => {
      console.error(err);
      alert('Failed to update refund status');
    }
  });
}

fetchCancelOrders(){
 this.apiService.getCancelOrderData().subscribe((res:any)=>{
   if(res.status){
        this.dataSource = res.data;
      }
  console.log("res cancel",res)
 })
}
}
