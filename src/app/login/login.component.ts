import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  public loginErrToast: boolean = false;
  constructor(public router: Router, 
  public loginService: LoginService, 
  private apiService: ApiService, 
  private toastr: ToastrService,
  private ngZone: NgZone) { }
  pass: any
  mobile: any
  ngOnInit() {
  //this.toastr.success('Toastr is working!', 'Success');
  }

  signup() {
    this.router.navigate(['signup'])
  }
  adminLogin(loginData: any) {
  let checkAdminLogin = this.loginService.adminLoginCheckFn(loginData.mobile, loginData.password);

  if (checkAdminLogin == false) {
    this.apiService.getUserDetailsData().subscribe((res) => {
      let userFound = false;

      res.forEach((element: any) => {
        if (loginData?.mobile === element?.user_phone && loginData?.password === element?.user_password) {
          const findObject = res.find(
            (item: any) =>
              item.user_password === loginData?.password &&
              item?.user_phone === loginData?.mobile
          );

          if (findObject) {
            localStorage.setItem('login_user', JSON.stringify(findObject));
            this.loginService.setUsername(findObject?.user_first_name);
            this.toastr.success('Login successful!', 'Welcome');
            this.router.navigate(['admindashboard']);
            userFound = true;
          }
        }
      });

      if (!userFound) {
        this.toastr.error('User not found. Please register first.', 'Login Failed');
      }
    });
  } else if (checkAdminLogin == true) {
    this.toastr.success('Admin login successful!', 'Welcome Admin');
    this.router.navigate(['admindashboard']);
  } else {
    this.toastr.error('Invalid mobile or password.', 'Login Error');
  }
}

    reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this


.router.navigate([currentUrl]);
    });
  }

}
