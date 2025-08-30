import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCustomerDialogComponent } from './edit-customer-dialog.component';

describe('EditCustomerDialogComponent', () => {
  let component: EditCustomerDialogComponent;
  let fixture: ComponentFixture<EditCustomerDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCustomerDialogComponent]
    });
    fixture = TestBed.createComponent(EditCustomerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
