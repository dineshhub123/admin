import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPincodeDailogComponent } from './add-pincode-dailog.component';

describe('AddPincodeDailogComponent', () => {
  let component: AddPincodeDailogComponent;
  let fixture: ComponentFixture<AddPincodeDailogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPincodeDailogComponent]
    });
    fixture = TestBed.createComponent(AddPincodeDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
