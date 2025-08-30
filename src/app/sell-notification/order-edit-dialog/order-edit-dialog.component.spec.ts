import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderEditDialogComponent } from './order-edit-dialog.component';

describe('OrderEditDialogComponent', () => {
  let component: OrderEditDialogComponent;
  let fixture: ComponentFixture<OrderEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderEditDialogComponent]
    });
    fixture = TestBed.createComponent(OrderEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
