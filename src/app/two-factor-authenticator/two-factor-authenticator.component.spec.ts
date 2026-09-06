import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoFactorAuthenticatorComponent } from './two-factor-authenticator.component';

describe('TwoFactorAuthenticatorComponent', () => {
  let component: TwoFactorAuthenticatorComponent;
  let fixture: ComponentFixture<TwoFactorAuthenticatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TwoFactorAuthenticatorComponent]
    });
    fixture = TestBed.createComponent(TwoFactorAuthenticatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
