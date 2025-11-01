// order-tracking.component.ts
import { Component, Input } from '@angular/core';

export interface TrackingEvent {
  date: string;
  time: string;
  location: string;
  status: string;
  description: string;
  isCurrent?: boolean;
}

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css']
})
export class OrderTrackingComponent {
  @Input() orderId: string = 'Y34XDH8';
  @Input() expectedArrival: string = '01/17/2020';
  @Input() carrier: string = 'USPS';
  @Input() trackingNumber: string = '241304E290480462';
  @Input() orderStatus: string = 'in_transit';

  trackingEvents: TrackingEvent[] = [
    {
      date: 'Jan 15, 2020',
      time: '10:30 AM',
      location: 'Distribution Center',
      status: 'delivered',
      description: 'Package delivered to recipient'
    },
    {
      date: 'Jan 15, 2020',
      time: '8:15 AM',
      location: 'Local Facility',
      status: 'out_for_delivery',
      description: 'Out for delivery'
    },
    {
      date: 'Jan 14, 2020',
      time: '6:45 PM',
      location: 'Regional Hub',
      status: 'in_transit',
      description: 'In transit to next facility',
      isCurrent: true
    },
    {
      date: 'Jan 13, 2020',
      time: '3:20 PM',
      location: 'Origin Facility',
      status: 'shipped',
      description: 'Package shipped'
    },
    {
      date: 'Jan 12, 2020',
      time: '2:15 PM',
      location: 'Online Store',
      status: 'confirmed',
      description: 'Order confirmed'
    }
  ];

  getStatusIcon(status: string): string {
    switch (status) {
      case 'confirmed': return 'check_circle';
      case 'shipped': return 'local_shipping';
      case 'in_transit': return 'airport_shuttle';
      case 'out_for_delivery': return 'delivery_dining';
      case 'delivered': return 'assignment_turned_in';
      default: return 'help';
    }
  }
get currentIndex(): number {
    return this.trackingEvents.findIndex(event => event.isCurrent);
  }
  getStatusColor(status: string): string {
    switch (status) {
      case 'confirmed': return '#2196F3';
      case 'shipped': return '#FF9800';
      case 'in_transit': return '#9C27B0';
      case 'out_for_delivery': return '#4CAF50';
      case 'delivered': return '#2E7D32';
      default: return '#757575';
    }
  }

  copyTrackingNumber(): void {
    navigator.clipboard.writeText(this.trackingNumber).then(() => {
      console.log('Tracking number copied to clipboard');
      // You can add a toast notification here
    });
  }
}