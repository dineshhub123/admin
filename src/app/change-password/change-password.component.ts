import { Component } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  hideCurrent = true;
  hideNew = true;
  hideConfirm = true;
  passwordStrength = 'Weak';
  strengthValue = 25;
  strengthClass = 'weak';

  constructor(private fb: FormBuilder,private apiService:ApiService,public toastr:ToastrService, public router:Router) { }

  changePasswordForm: FormGroup = this.fb.group({
    current_password: ['', Validators.required],
    new_password: ['', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
    ]
    ],
    confirm_password: ['', Validators.required],
  },
    {
      validators: this.passwordDifferentValidator
    }
  );

passwordDifferentValidator(form: AbstractControl) {
  const current = form.get('current_password')?.value;
  const newPass = form.get('new_password')?.value;
  return current && newPass && current === newPass
    ? { samePassword: true }
    : null;
}

  get passwordMatched(): boolean {
    return (
      this.changePasswordForm.value.new_password ===
      this.changePasswordForm.value.confirm_password
    );
  }

  checkStrength(): void {

    const password =
    this.changePasswordForm.value.new_password || '';
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[@$!%*?&]/.test(password)) score++;

    if (score <= 2) {
      this.passwordStrength = 'Weak';
      this.strengthClass = 'weak';
      this.strengthValue = 30;
    }
    else if (score <= 4) {
      this.passwordStrength = 'Medium';
      this.strengthClass = 'medium';
      this.strengthValue = 65;
    }
    else {
      this.passwordStrength = 'Strong';
      this.strengthClass = 'strong';
      this.strengthValue = 100;
    }
  }

updatePassword(): void {
  if (this.changePasswordForm.invalid || !this.passwordMatched) {
    return;
  }
  const payload = {
    current_password: this.changePasswordForm.value.current_password,
    new_password: this.changePasswordForm.value.new_password
  };
this.apiService.changePassword(payload).subscribe({
    next: (res) => {
      if (res.success) {
        this.toastr.success(
          'Password changed successfully. Please login again.');
          // Clear session/token
        localStorage.removeItem('token');
        localStorage.removeItem('login_admin');
        sessionStorage.clear();
        // Reset form
        this.changePasswordForm.reset();
        // Redirect to login
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      } else {
        this.toastr.error(
          res.message || 'Failed to change password');
      }
    },
    error: (err) => {
      this.toastr.error(
        err?.error?.message || 'Failed to change password');
        console.error(err);
    }
  });
}
}