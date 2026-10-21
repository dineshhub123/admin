import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { OrderNotificationService } from '../order-notification.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-two-factor-authenticator',
  templateUrl: './two-factor-authenticator.component.html',
  styleUrls: ['./two-factor-authenticator.component.css']
})
export class TwoFactorAuthenticatorComponent {
  constructor(private apiService: ApiService, private authService: AuthService,
    private loginService: LoginService, private router: Router,
    private orderNotify: OrderNotificationService, private toastr: ToastrService) { }
  otpArray = Array(6);
  otp: string[] = ['', '', '', '', '', ''];
  twoFaForm: FormGroup = new FormGroup({
    otp: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]),
  });


  verifyOtp() {
    const otpCode = this.otp.join('');
    this.twoFaForm.patchValue({
      otp: otpCode
    });
    this.twoFaForm.get('otp')?.markAsTouched();
    if (this.twoFaForm.invalid) {
      return;
    }
    const user = JSON.parse(
      sessionStorage.getItem('pending_user') || '{}'
    );
    const payload = {
      admin_id: user?.admin_id,
      otp: otpCode
    };
    this.apiService.verify2faOtp(payload).subscribe({
      next: (res: any) => {
        if (res?.status === 'success') {
          const token = sessionStorage.getItem('pending_token');
          this.authService.saveToken(token!);
          this.loginService.setUser(user);
          sessionStorage.removeItem('pending_token');
          sessionStorage.removeItem('pending_user');
          if (user.role === 'SUPER_ADMIN') {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/productlist']);
          }
          this.toastr.success(
            'You are login successfully!',
            `Welcome, ${user.name}`
          );
          this.getPendingOrdersPreview();
        } else {

          this.toastr.error(
            res?.message || 'Invalid OTP'
          );
        }
      },
      error: (err) => {
        console.error(err);
        this.toastr.error(
          'OTP verification failed',
          'Error'
        );
      }
    });
  }

  getPendingOrdersPreview() {
    this.apiService.getPendingOrder().subscribe(res => {
      this.orderNotify.setPendingOrders(res);
    })
  }

  get isOtpValid(): boolean {
    return /^[0-9]{6}$/.test(this.otp.join(''));
  }

  onInput(event: any, index: number) {
    const value = event.target.value;
    if (value.length === 1) {
      const next = event.target.nextElementSibling;
      if (next) {
        next.focus();
      }
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace' && !input.value) {
      const prev = input.previousElementSibling as HTMLInputElement;
      if (prev) {
        prev.focus();
      }
    }
  }

}