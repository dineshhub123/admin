import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FcmService } from 'src/app/fcm.service';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'index',
    'order_id',
    'customer',
    'mobile',
    'address',
    'product',
    'price',
    'quantity',
    'item_total',
    'order_total',
    'status',
    'created_at',
    'view'
  ];

  dataSource = new MatTableDataSource<any>();
  constructor(private router: Router, public fcmService: FcmService, public apiService: ApiService) { }
  isLoading: boolean = false;
  ngOnInit() {
    const adminId = 1; // logged-in admin
    this.fcmService.initFCM(adminId);
    // VERY IMPORTANT: attach foreground listener
    this.fcmService.listenMessages();
    this.loadOrders();
    this.fcmService.message$.subscribe(payload => {
      console.log('Order notification received:', payload);
      // reload orders
      this.loadOrders();
    });
  }

  loadOrders() {
    try {
      this.isLoading = true;
      this.apiService.getOrderList().subscribe(res => {
        // console.log("resOrder", res)
        this.isLoading = false
        const rows: any[] = [];
        res.forEach((order: any) => {
          order.items.forEach((item: any) => {
            rows.push({
              order_id: order.order_id,
              customer: order.delivery_address.name,
              mobile: order.delivery_address.mobile,
              address: order.delivery_address.address,
              product: item.product_name,
              price: item.price,
              quantity: item.quantity,
              item_total: item.price * item.quantity,
              order_total: order.total_amount,
              status: order.status,
              created_at: order.created_at
            })
            this.dataSource.data = rows;
          })
        })
      });
    } catch (err) {
      this.isLoading = false;
      console.error('API Error:', err);
    }
  }
  onClickRefresh() {
    this.loadOrders();

  }
  selectedDate: Date | null = new Date();

  onDateChange(date: Date) {
    console.log('Selected date:', date);
  }
  viewItem(orderId: string) {
    this.router.navigate(['/orderlist/orderview', orderId]);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}

