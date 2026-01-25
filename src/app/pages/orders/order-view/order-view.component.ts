// order-view.component.ts
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { OrderNotificationService } from 'src/app/order-notification.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent {
  imageBaseUrl = environment.imageBaseUrl
  public orderDetailData: any;
  public orderId!: number;
  public loading = false;
  // Available statuses for the stepper
  statuses = ['pending', 'confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered', 'cancelled'];
  currentStatusIndex = 2; // Start with processing
  isMobile = false;
  displayedColumns: string[] = [
    'image',
    'product_name',
    // 'variant',
    'quantity',
    'price',
    // 'discount',
  ];

  constructor(private breakpointObserver: BreakpointObserver, private apiService: ApiService,
    public activatedRoute: ActivatedRoute, public router: Router,private orderNotify: OrderNotificationService,
    ) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const order_id = params['order_id'];
      this.orderId = order_id;
      console.log(this.orderId)

      if (this.orderId) {
        this.getOrderByID();
      }
    });

    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isMobile = result.matches;
      });

  }


  getOrderByID() {
    this.apiService.getOrderByID(this.orderId).subscribe({
      next: (res: any) => {
        this.orderDetailData = res?.data;
        if (res?.data?.status) {
          this.currentStatusIndex = this.statuses.indexOf(res?.data?.status);
        }
        console.log("orderDetailData", this.orderDetailData)
      },
      error: (err) => {
        console.error("Order API error", err);
      }
    });
  }

  // In your order-view.component.ts - Add this method
  getStepperStatus(): string {
    const statusMap: { [key: string]: string } = {
      pending: 'pending',
      confirmed: 'confirmed',
      processing: 'processing',
      shipped: 'shipped',
      out_for_delivery: 'out_for_delivery',
      delivered: 'delivered',
      cancelled: 'cancelled'
    };

    const status = this.orderDetailData?.status?.toLowerCase();

    return statusMap[status ?? ''] || 'delivered';
  }

  changeStatus(direction: number): void {
    this.loading = true;
    const newIndex = this.currentStatusIndex + direction;
    if (newIndex < 0 || newIndex >= this.statuses.length) {
      return;
    }
    const previousStatus = this.orderDetailData.status;
    const nextStatus = this.statuses[newIndex];
    this.currentStatusIndex = newIndex;
    this.orderDetailData.status = nextStatus;
    try {
      let statusPayload = {
        order_id: this.orderId,
        status: nextStatus
      }
      this.apiService.updateOrderStatus(statusPayload).subscribe((res: any) => {
        if (res) {
      this.apiService.getPendingOrder().subscribe((res: any[]) => {
      this.orderNotify.setPendingOrders(res);
    });

          this.loading = false;
        }
      })
    }
    catch (err) {
      this.loading = false;
    }
  }

  getPreviousStatus(): string | null {
    if (this.currentStatusIndex > 0) {
      return this.formatStatus(this.statuses[this.currentStatusIndex - 1]);
    }
    return null;
  }

  getNextStatus(): string | null {
    if (this.currentStatusIndex < this.statuses.length - 1) {
      return this.formatStatus(this.statuses[this.currentStatusIndex + 1]);
    }
    return null;
  }



  /* Already created earlier */
  getCurrentStatus(): string {
    return this.formatStatus(this.orderDetailData?.status);
  }

  formatStatus(status?: string): string {
    if (!status) {
      return '';
    }
    return status
      .replace(/_/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'pending': return 'warn';
      case 'confirmed': return 'primary';
      case 'processing': return 'accent';
      case 'shipped': return 'primary';
      case 'out_for_delivery': return 'accent';
      case 'delivered': return 'primary';
      default: return 'primary';
    }
  }

  getPaymentStatusColor(status: string): string {
    switch (status) {
      case 'paid': return 'primary';
      case 'pending': return 'accent';
      case 'failed': return 'warn';
      default: return 'primary';
    }
  }


  // FIXED: Remove Order type to avoid type errors
  cancelOrder(order: any): void {
    this.loading = true;

    if (order.status === 'cancelled' || order.status === 'delivered') {
      return;
    }

    if (confirm(`Are you sure you want to cancel order ${order.order_id}?`)) {
      order.status = 'cancelled';
      this.currentStatusIndex = this.statuses.indexOf('cancelled');
      console.log('Order cancelled:', order);
      alert(`Order ${order.order_id} has been cancelled successfully!`);
    }
    try {
      let statusPayload = {
        order_id: this.orderId,
        status: 'cancelled'
      }
      this.apiService.updateOrderStatus(statusPayload).subscribe((res: any) => {
        if (res) {
          this.loading = false;

        }
      })
    }
    catch (err) {
      this.loading = false;

    }

  }


  viewProductDetails(item: any) {
    console.log('View product details:', item);
    // Implement product details view
  }

  // Generic method to update order status
  private updateOrderStatus(order: any, newStatus: string, successMessage: string) {
    const previousStatus = order.order_status;
    order.status = newStatus;
    this.currentStatusIndex = this.statuses.indexOf(newStatus);

    console.log(`Order status changed from ${previousStatus} to ${newStatus}:`, order);

    // Show success message
    alert(`${successMessage}! Order #${order.order_id}`);

    // Here you would typically call your API service
    // this.orderService.updateOrderStatus(order.order_id, newStatus).subscribe(...);
  }

  // Status filter change handler
  onStatusFilterChange(selectedValue: string): void {
    console.log('Status filter changed to:', selectedValue);

    if (selectedValue !== 'all') {
      const statusMessages: { [key: string]: string } = {
        'pending': 'Order marked as Pending',
        'confirmed': 'Order confirmed',
        'processing': 'Order processing started',
        'shipped': 'Order shipped',
        'out_for_delivery': 'Order out for delivery',
        'delivered': 'Order delivered'
      };

      this.updateOrderStatus(this.orderDetailData, selectedValue, statusMessages[selectedValue]);
    }
  }

  // Get next available actions based on current status
  getAvailableActions(): string[] {
    const currentStatus = this.orderDetailData.status;
    const statusHierarchy = ['pending', 'confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered'];
    const currentIndex = statusHierarchy.indexOf(currentStatus);

    if (currentStatus === 'cancelled') {
      return ['pending']; // Can only move back to pending from cancelled
    }

    const availableActions = [];

    if (currentIndex > 0) {
      availableActions.push(statusHierarchy[currentIndex - 1]); // Previous status
    }

    if (currentIndex < statusHierarchy.length - 1) {
      availableActions.push(statusHierarchy[currentIndex + 1]); // Next status
    }

    availableActions.push('cancelled'); // Always can cancel

    return availableActions;
  }

  // Check if an action is allowed
  isActionAllowed(action: string): boolean {
    return this.getAvailableActions().includes(action);
  }

  // Get status class for styling
  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending': return 'status-pending';
      case 'confirmed': return 'status-confirmed';
      case 'processing': return 'status-processing';
      case 'shipped': return 'status-shipped';
      case 'out_for_delivery': return 'status-out-for-delivery';
      case 'delivered': return 'status-delivered';
      case 'cancelled': return 'status-cancelled';
      default: return 'status-default';
    }
  }

  // Get status icon
  getStatusIcon(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending': return 'schedule';
      case 'confirmed': return 'check_circle';
      case 'processing': return 'build';
      case 'shipped': return 'local_shipping';
      case 'out_for_delivery': return 'delivery_dining';
      case 'delivered': return 'assignment_turned_in';
      case 'cancelled': return 'cancel';
      default: return 'help';
    }
  }



  printInvoice() {
    this.router.navigate(["invoice"])
  }
  printAdressLabel() {
    this.router.navigate(["address-label"])

  }
  handleImageError(event: any) {
    event.target.src = 'assets/uploads/shirt.jpg';
  }

  getTopBarTitle(): string {
    if (this.orderDetailData.status === 'cancelled') {
      return 'Order Has Been Cancelled !';
    }
    if (this.orderDetailData.status === 'delivered') {
      return 'Order Has Been Delivered !';
    }

    return this.getStepperStatus();
  }
  goBack(): void {
    this.router.navigate(['/orderlist']);
  }

}