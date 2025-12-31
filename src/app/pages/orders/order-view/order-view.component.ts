// order-view.component.ts
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent {
  order: any = {
    order_id: "ORD_1001",
    user: {
      user_first_name: "Dinesh",
      user_last_name: "Bhagat",
      user_email: "dineshbhagatbpl@gmail.com",
      user_phone: "8600245120",
      user_address: "Garra",
      user_pincode: "481001"
    },
    items: [
      {
        product_id: "product_001",
        product_name: "Shoes for mens casuals",
        category: "Footwear",
        sub_category: "Shoes",
        quantity: 1,
        product_price: 1800,
        product_mrp_price: 2000,
        product_discount: 200,
        variant: { color: "Yellow", colorCode: "#FFFF00", size: "M" },
        image_url: "assets/uploads/shoes-yellow.webp"
      }
    ],
    payment: {
      method: "Razorpay",
      status: "paid",
      transaction_id: "pay_NqfR64p2h3v0M8"
    },
    delivery_date: "Thu Jan 16",
    order_status: "processing",
    order_date: new Date("2025-10-25T10:15:00"),
    total_amount: 1800
  };

  // Available statuses for the stepper
  statuses = ['pending', 'confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered', 'cancelled'];
  currentStatusIndex = 2; // Start with processing
isMobile = false;
  displayedColumns: string[] = [
    'image',
    'product_name',
    'variant',
    'quantity',
    'price',
    'discount',
  ];

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.currentStatusIndex = this.statuses.indexOf(this.order.order_status);
 this.breakpointObserver.observe([Breakpoints.Handset])
    .subscribe(result => {
      this.isMobile = result.matches;
    });
  }
// Status Change Methods
  markAsPending(order: any) {
    if (confirm(`Mark order ${order.order_id} as Pending?`)) {
      this.updateOrderStatus(order, 'pending', 'Order marked as Pending');
    }
  }

  confirmOrder(order: any) {
    if (confirm(`Confirm order ${order.order_id}?`)) {
      this.updateOrderStatus(order, 'confirmed', 'Order confirmed successfully');
    }
  }

  processOrder(order: any) {
    if (confirm(`Start processing order ${order.order_id}?`)) {
      this.updateOrderStatus(order, 'processing', 'Order is now being processed');
    }
  }

  shipOrder(order: any) {
    if (confirm(`Mark order ${order.order_id} as Shipped?`)) {
      this.updateOrderStatus(order, 'shipped', 'Order has been shipped');
    }
  }

  outForDelivery(order: any) {
    if (confirm(`Mark order ${order.order_id} as Out for Delivery?`)) {
      this.updateOrderStatus(order, 'out_for_delivery', 'Order is out for delivery');
    }
  }

  deliverOrder(order: any) {
    if (confirm(`Mark order ${order.order_id} as Delivered?`)) {
      this.updateOrderStatus(order, 'delivered', 'Order has been delivered successfully');
    }
  }


// In your order-view.component.ts - Add this method
getStepperStatus(): string {
  // Map the order status to stepper status
  const statusMap: { [key: string]: string } = {
    'pending': 'pending',
    'confirmed': 'confirmed',
    'processing': 'processing',
    'shipped': 'shipped',
    'out_for_delivery': 'out_for_delivery',
    'delivered': 'delivered'
  };
  
  return statusMap[this.order.order_status.toLowerCase()] || 'pending';
}

  changeStatus(direction: number) {
    this.currentStatusIndex = Math.max(0, Math.min(this.statuses.length - 1, this.currentStatusIndex + direction));
    this.order.order_status = this.statuses[this.currentStatusIndex];
    console.log('Order status changed to:', this.order.order_status);
  }

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
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
    switch (status.toLowerCase()) {
      case 'paid': return 'primary';
      case 'pending': return 'accent';
      case 'failed': return 'warn';
      default: return 'primary';
    }
  }

  // FIXED: Remove Order type to avoid type errors
  viewOrderDetails(order: any) {
    console.log('View order details:', order);
    // Implement navigation to detailed order view
  }

  // FIXED: Remove Order type to avoid type errors
  cancelOrder(order: any) {
    if (confirm(`Are you sure you want to cancel order ${order.order_id}?`)) {
      this.order.order_status = 'cancelled';
      this.currentStatusIndex = this.statuses.indexOf('cancelled');
      console.log('Order cancelled:', order);
      
      // Show success message
      alert(`Order ${order.order_id} has been cancelled successfully!`);
      
      // Here you would typically call your API service
      // this.orderService.cancelOrder(order.order_id).subscribe(...);
    }
  }

  viewProductDetails(item: any) {
    console.log('View product details:', item);
    // Implement product details view
  }

    // Generic method to update order status
  private updateOrderStatus(order: any, newStatus: string, successMessage: string) {
    const previousStatus = order.order_status;
    order.order_status = newStatus;
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
      
      this.updateOrderStatus(this.order, selectedValue, statusMessages[selectedValue]);
    }
  }

  // Get next available actions based on current status
  getAvailableActions(): string[] {
    const currentStatus = this.order.order_status;
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

  

  printOrder() {
    window.print();
  }

  handleImageError(event: any) {
    event.target.src = 'assets/uploads/shirt.jpg';
  }
}