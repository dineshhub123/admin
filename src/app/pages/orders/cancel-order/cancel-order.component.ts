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
        this.dataSource.data = res.data;
        this.dataSource.paginator = this.paginator;
      
      }
  console.log("res cancel",res)
 })
}
}
