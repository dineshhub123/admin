import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleAuthenticatorSetupComponent } from './google-authenticator-setup.component';

describe('GoogleAuthenticatorSetupComponent', () => {
  let component: GoogleAuthenticatorSetupComponent;
  let fixture: ComponentFixture<GoogleAuthenticatorSetupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoogleAuthenticatorSetupComponent]
    });
    fixture = TestBed.createComponent(GoogleAuthenticatorSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
