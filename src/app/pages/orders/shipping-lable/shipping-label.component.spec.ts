import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingLableComponent } from './shipping-label.component';

describe('ShippingLableComponent', () => {
  let component: ShippingLableComponent;
  let fixture: ComponentFixture<ShippingLableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShippingLableComponent]
    });
    fixture = TestBed.createComponent(ShippingLableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
