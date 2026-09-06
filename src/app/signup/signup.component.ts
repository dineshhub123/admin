import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  adminSignupForm!: FormGroup;
  hidePassword = true;

  constructor(public router:Router,private apiService:ApiService,private fb: FormBuilder,public toastr: ToastrService
) { }

  get f() { return this.adminSignupForm.controls; }

  ngOnInit() {
      this.adminSignupForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required]],
  })
}

adminSignup() {
  if (this.adminSignupForm.invalid) {
    this.toastr.warning('Please fill all required fields');
    return;
  }
  let insertAdminDetailsPayload = {
    first_name: this.adminSignupForm?.value?.firstname,
    last_name: this.adminSignupForm?.value?.lastname,
    email: this.adminSignupForm?.value?.email,
    phone: this.adminSignupForm?.value?.phone,
    password: this.adminSignupForm?.value?.password,
    role: this.adminSignupForm?.value?.role
  };
  this.apiService.insertAdminDetails(insertAdminDetailsPayload)
    .subscribe({
      next: (res: any) => {
        this.toastr.success(
          `Your registration is complete. You can now login!`,
          `Welcome, ${this.adminSignupForm.value.firstname}!`
        );
        this.router.navigateByUrl('/login');
      },

      error: (err: any) => {
        console.error(err);
        this.toastr.error(
          err?.error?.message || 'Registration failed'
        );
      }

    });
}}
