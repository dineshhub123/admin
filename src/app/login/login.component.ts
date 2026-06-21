import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PrivacyService } from '../services/privacy.service';
import { MatDialog } from '@angular/material/dialog';
import { PrivacyPopupComponent } from '../privacy-popup/privacy-popup.component';
import { OrderNotificationService } from '../order-notification.service';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isModalOpen = false;
  modalTitle = '';
  showPrivacyPopup = false;
  hidePassword = true;
  loginForm: FormGroup = new FormGroup({
    mobile: new FormControl('', [Validators.required, Validators.pattern(/^([0-9]{10}|[^\s@]+@[^\s@]+\.[^\s@]+)$/)]),
    password: new FormControl('', [Validators.required])
  });

  public loginErrToast: boolean = false;
  constructor(public router: Router,
    public loginService: LoginService, private dialog: MatDialog,
    private apiService: ApiService,
    private toastr: ToastrService,
    private authService: AuthService,
    private privacyService: PrivacyService, private orderNotify: OrderNotificationService,

    private ngZone: NgZone) { }
  pass: any
  mobile: any
  ngOnInit() {
    if (this.loginService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
    this.showPrivacyPopup = !this.privacyService.hasUserResponded();
  }
  // signup() {
  //   this.router.navigate(['signup'])
  // }

  openDialog(title: string): void {
    this.dialog.open(PrivacyPopupComponent, {
      width: '600px',
      data: { title }
    });
  }
  login(loginData: any): void {
    if (!this.loginForm.valid) return;
    const payload = {
      login: loginData.mobile,
      password: loginData.password
    };
    this.apiService.getAdminLoginDetailsData(payload).subscribe({
      next: (res: any) => {
        const user = res.admin;
        const token = res.token;
        this.loginForm.reset();
        sessionStorage.setItem('pending_token', token);
        sessionStorage.setItem('pending_user', JSON.stringify(user));
        if (user.is_2fa_enabled == 0) {
          this.router.navigate(['/2fa-setup']);
        } else {
          this.router.navigate(['/2fa-otp']);
        }
      },
      error: err => {
        console.error(err);
        this.toastr.error(
          'User not found. Please register first or wrong credentials.',
          'Login Failed'
        );
      }
    });
  }

  canLogin(): boolean {
    return this.privacyService.hasUserResponded();
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  twoAuthenticator() {
    this.router.navigate(["/2fa-otp"])
  }
  secretQr() {
    this.router.navigate(["/2fa-setup"])

  }
}
