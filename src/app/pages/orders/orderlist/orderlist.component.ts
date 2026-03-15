import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FcmService } from 'src/app/fcm.service';
import { ApiService } from 'src/app/api.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private msgSub!: Subscription;
  public selectedStatus: string = 'all';
  displayedColumns: string[] = [
    'index',
    'order_id',
    'customer',
    'mobile',
    'address',
    'product',
    'price',
    'quantity',
    'total_price',
    'status',
    'updated_at',
    'created_at',
    'view'
  ];

  dataSource = new MatTableDataSource<any>();
  constructor(private router: Router, public fcmService: FcmService, public apiService: ApiService) { }
  isLoading: boolean = false;
  ngOnInit() {
    this.loadOrdersByStatus(this.selectedStatus)
    this.msgSub = this.fcmService.message$.subscribe(payload => {
      this.loadOrders();
    });
  }
  onStatusChange(status: any) {
    this.selectedStatus = status;
    this.loadOrdersByStatus(status)
  }

  loadOrdersByStatus(status: string) {
    try {
      this.isLoading = true;
      this.apiService.getOrderByStatus(status).subscribe(res => {
        this.isLoading = false
        const rows: any[] = [];
        const seen = new Set<string>();

        res?.orders?.forEach((order: any) => {
          if (seen.has(order.order_id)) return;   // ✅ skip duplicate order_id
          seen.add(order.order_id);
          const firstItem = order?.items?.[0]; // take first product only
          rows.push({
            order_id: order.order_id,
            customer: order.delivery_address?.name,
            mobile: order.delivery_address?.mobile,
            address: order.delivery_address?.address,
            product: firstItem?.product_name || 'N/A',
            price: firstItem?.price || 0,
            quantity: firstItem?.quantity || 0,
            item_total: (firstItem?.price || 0) * (firstItem?.quantity || 0),
            order_total: order.total_amount,
            status: order.status,
            updated_at: order.updated_at,
            created_at: order.created_at

          });
        });

        this.dataSource.data = rows;

      })
    } catch (err) {
      this.isLoading = false;
      console.error('API Error:', err);

    }
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();

    // filter only order_id column
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.order_id?.toLowerCase().includes(filter);
    };
  }

  loadOrders() {
    try {
      this.isLoading = true;
      this.apiService.getOrderList().subscribe(res => {
        // console.log("resOrder", res)
        this.isLoading = false
        const rows: any[] = [];
        res?.orders?.forEach((order: any) => {
          order?.items?.forEach((item: any) => {
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
  getStatusClass(status: string): string {
    switch ((status || '').toLowerCase()) {
      case 'pending': return 'st-pending';
      case 'confirmed': return 'st-confirmed';
      case 'shipped': return 'st-shipped';
      case 'out_for_delivery': return 'st-out';
      case 'delivered': return 'st-delivered';
      case 'cancelled': return 'st-cancelled';
      default: return 'st-default';
    }
  }

  ngOnDestroy() {
    if (this.msgSub) this.msgSub.unsubscribe();
  }
  onClickRefresh() {
    this.loadOrdersByStatus(this.selectedStatus)

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

