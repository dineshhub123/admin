import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStatusStepperComponent } from './order-status-stepper.component';

describe('OrderStatusStepperComponent', () => {
  let component: OrderStatusStepperComponent;
  let fixture: ComponentFixture<OrderStatusStepperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderStatusStepperComponent]
    });
    fixture = TestBed.createComponent(OrderStatusStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
