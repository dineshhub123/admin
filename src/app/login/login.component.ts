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
//  login(loginData: any) {
//   if (this.loginForm.valid) {
//     this.apiService.getUserDetailsData().subscribe((res) => {
//       try {
//         const findObject = res.find(
//           (item: any) =>
//             item.user_password === loginData?.password &&
//             (item?.user_phone === loginData?.mobile || item?.user_email === loginData?.mobile)
//         );

//         console.log(findObject, 'find');

//         if (findObject) {
//           localStorage.setItem('login_user', JSON.stringify(findObject));
//           this.loginService.login();
//           this.toastr.success('Login successful!', 'Welcome');
//           this.router.navigate(['dashboard']);
//         } else {
//           this.toastr.error('User not found. Please register first.', 'Login Failed');
//         }
//       } catch (error) {
//         console.error('An error occurred during login:', error);
//         this.toastr.error('An unexpected error occurred. Please try again.', 'Login Error');
//       }
//     });
//   }
// }

  login(loginData: any): void {
    if (!this.loginForm.valid) return;

    const payload = {
      login: loginData.mobile,   // email OR phone
      password: loginData.password
    };

    this.apiService.getUserDetailsData(payload).subscribe({
      next: (res: any) => {
        const user = res.user;
        user.userId = `user_${user.id}`;
       // user.isGuest = false;

        // const guestId = this.loginService.getUser()?.userId;
        // this.loginService.setUser(user);

        // if (guestId?.startsWith('guest_')) {
        //   this.addcartService.transferCart(guestId, user.userId);
        // }
        localStorage.setItem('login_user', JSON.stringify(user));
        this.loginService.login();
        this.loginForm.reset();
        this.router.navigate(['dashboard']);
        this.toastr.success(
          'You are login successfully!',
          `Welcome, ${user.user_first_name}`
        );
      },
      error: err => {
        console.error(err);
        this.toastr.error('User not found. Please register first or might be wrong credential.', 'Login Failed');
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

}
