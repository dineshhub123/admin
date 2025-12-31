// order-status-stepper.component.ts
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

export interface OrderStatusStep {
  label: string;
  status: string;
  description: string;
  date?: string;
  completed: boolean;
  active: boolean;
  icon: string;
}

@Component({
  selector: 'app-order-status-stepper',
  templateUrl: './order-status-stepper.component.html',
  styleUrls: ['./order-status-stepper.component.css']
})
export class OrderStatusStepperComponent implements OnChanges {
  
  @Input() currentStatus: string = 'pending';
  @Input() orderDate: string = '';
  @Input() deliveryDate: string = '';
  
  statusSteps: OrderStatusStep[] = [
    {
      label: 'Pending',
      status: 'pending',
      description: 'Your order has been received',
      completed: false,
      active: false,
      icon: 'shopping_cart'
    },
    {
      label: 'Confirmed',
      status: 'confirmed',
      description: 'Order has been confirmed',
      completed: false,
      active: false,
      icon: 'check_circle'
    },
    {
      label: 'Processing',
      status: 'processing',
      description: 'Preparing your order',
      completed: false,
      active: false,
      icon: 'build'
    },
    {
      label: 'Shipped',
      status: 'shipped',
      description: 'Order has been shipped',
      completed: false,
      active: false,
      icon: 'local_shipping'
    },
    {
      label: 'Out for Delivery',
      status: 'out_for_delivery',
      description: 'Order is out for delivery',
      completed: false,
      active: false,
      icon: 'delivery_dining'
    },
    {
      label: 'Delivered',
      status: 'delivered',
      description: 'Order has been delivered',
      completed: false,
      active: false,
      icon: 'assignment_turned_in'
    }
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentStatus'] || changes['orderDate'] || changes['deliveryDate']) {
      this.updateStepperStatus();
    }
  }

  private updateStepperStatus(): void {
    const statusHierarchy = ['pending', 'confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered'];
    const currentIndex = statusHierarchy.indexOf(this.currentStatus.toLowerCase());
    
    // For cancelled status, show all steps as incomplete except cancelled
    if (this.currentStatus.toLowerCase() === 'cancelled') {
      this.statusSteps.forEach(step => {
        step.completed = false;
        step.active = step.status === 'cancelled';
      });
      return;
    }

    this.statusSteps.forEach((step, index) => {
      if (step.status === 'cancelled') {
        step.completed = false;
        step.active = false;
        return;
      }

      const stepIndex = statusHierarchy.indexOf(step.status);
      step.completed = stepIndex < currentIndex;
      step.active = stepIndex === currentIndex;
      
      // Set dates
      if (index === 0 && this.orderDate) {
        step.date = this.formatDate(this.orderDate);
      }
      if (step.status === 'delivered' && this.deliveryDate) {
        step.date = this.deliveryDate;
      }
    });
  }

  public formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  }

  getStatusClass(step: OrderStatusStep): string {
    if (step.status === 'cancelled' && step.active) {
      return 'status-cancelled';
    } else if (step.completed) {
      return 'status-completed';
    } else if (step.active) {
      return 'status-active';
    } else {
      return 'status-pending';
    }
  }

  getProgressPercentage(): number {
    if (this.currentStatus === 'cancelled') return 0;
    
    const statusHierarchy = ['pending', 'confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered'];
    const currentIndex = statusHierarchy.indexOf(this.currentStatus.toLowerCase());
    return ((currentIndex + 1) / statusHierarchy.length) * 100;
  }

  getCurrentStepLabel(): string {
    const currentStep = this.statusSteps.find(step => step.active);
    return currentStep ? currentStep.label : 'Order Placed';
  }
}