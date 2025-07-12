import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PrivacyService } from '../services/privacy.service';
import { MatDialog } from '@angular/material/dialog';
import { PrivacyPopupComponent } from '../privacy-popup/privacy-popup.component';

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
    mobile: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  public loginErrToast: boolean = false;
  constructor(public router: Router,
    public loginService: LoginService,private dialog: MatDialog,
    private apiService: ApiService,
    private toastr: ToastrService,private privacyService: PrivacyService,
    private ngZone: NgZone) { }
  pass: any
  mobile: any
  ngOnInit() {
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
 adminLogin(loginData: any) {
  if (this.loginForm.valid) {
    this.apiService.getUserDetailsData().subscribe((res) => {
      try {
        const findObject = res.find(
          (item: any) =>
            item.user_password === loginData?.password &&
            (item?.user_phone === loginData?.mobile || item?.user_email === loginData?.mobile)
        );

        console.log(findObject, 'find');

        if (findObject) {
          localStorage.setItem('login_user', JSON.stringify(findObject));
          this.loginService.setUsername(findObject?.user_first_name);
          this.toastr.success('Login successful!', 'Welcome');
          setTimeout(() => {
            this.router.navigate(['dashboard']);
            this.loginForm.reset();
          }, 2000);
        } else {
          this.toastr.error('User not found. Please register first.', 'Login Failed');
        }
      } catch (error) {
        console.error('An error occurred during login:', error);
        this.toastr.error('An unexpected error occurred. Please try again.', 'Login Error');
      }
    });
  }
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
