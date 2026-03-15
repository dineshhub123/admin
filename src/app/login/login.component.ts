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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
isModalOpen = false;
  modalTitle = '';
 showPrivacyPopup = false;
  loginForm: FormGroup = new FormGroup({
    mobile: new FormControl('', [Validators.required, Validators.pattern(/^([0-9]{10}|[^\s@]+@[^\s@]+\.[^\s@]+)$/)]),
    password: new FormControl('', [Validators.required])
  });

  public loginErrToast: boolean = false;
  constructor(public router: Router,
    public loginService: LoginService,private dialog: MatDialog,
    private apiService: ApiService,
    private toastr: ToastrService,private privacyService: PrivacyService,private orderNotify: OrderNotificationService,
    
    private ngZone: NgZone) { }
  pass: any
  mobile: any
  ngOnInit() {
    if (this.loginService.isLoggedIn()) {
    this.router.navigate(['/dashboard']);
  }
 this.showPrivacyPopup = !this.privacyService.hasUserResponded();
  }
  signup() {
    this.router.navigate(['signup'])
  }

openDialog(title: string): void {
    this.dialog.open(PrivacyPopupComponent, {
      width: '600px',
      data: { title }
    });
  }
  login(loginData: any): void {
    if (!this.loginForm.valid) return;

    const payload = {
      login: loginData.mobile,   // email OR phone
      password: loginData.password
    };

    this.apiService.getAdminLoginDetailsData(payload).subscribe({
      next: (res: any) => {
        const user = res.admin;
        localStorage.setItem('login_admin', JSON.stringify(user));
        this.loginService.login();
        this.loginForm.reset();
        this.router.navigate(['dashboard']);
        this.toastr.success(
          'You are login successfully!',
          `Welcome, ${user.name}`
        );
        this.getPendingOrdersPreview();
      },
      error: err => {
        console.error(err);
        this.toastr.error('User not found. Please register first or might be wrong credential.', 'Login Failed');
      }
    });
  }

  getPendingOrdersPreview() {
    this.apiService.getPendingOrder().subscribe(res => {
      this.orderNotify.setPendingOrders(res);
    })
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

}
