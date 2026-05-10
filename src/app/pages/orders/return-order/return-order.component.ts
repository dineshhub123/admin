import { Component, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-return-order',
  templateUrl: './return-order.component.html',
  styleUrls: ['./return-order.component.css']
})
export class ReturnOrderComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  refund_Completed: boolean = false;
  displayedColumns: string[] = [
    'index',
    'return_id',
    'customer_name',
    'order_id',
    'product_id',
    'product_name',
    'reason',
    'return_type',
    'created_at',
    'refund_amount',
    'status',
    'action'
  ];

  dataSource = new MatTableDataSource<any>([]);

  constructor(private apiService: ApiService) { }
  ngOnInit() {
    this.allReturnOrderData();
    this.dataSource.paginator = this.paginator;
    this.paginator.pageSize = 5;
  }

  allReturnOrderData() {
    this.apiService.getReturnOrderData().subscribe((res: any) => {
      this.dataSource.data = res.data || [];
      this.dataSource.paginator = this.paginator;
      console.log("return data", res)
    })
  }
  approve(id: number) {
    console.log('Approve', id);
    this.apiService.upadateReturnStatus(id, 'Approved').subscribe(() => {
      this.apiService.assignPickup(id).subscribe(() => {
        this.allReturnOrderData();
      })
    })

  }

  reject(id: number) {
    console.log('Reject', id);
    // call reject API here
    this.apiService.upadateReturnStatus(id, 'Rejected').subscribe(() => {
      this.allReturnOrderData();
    })

  }

  markPicked(id: number) {
    this.apiService.markPickupComplete(id).subscribe(() => {
      this.allReturnOrderData();
    })
  }
  processRefund(id: number) {
    // call refund api here 
    this.refund_Completed = true;


  }
}







