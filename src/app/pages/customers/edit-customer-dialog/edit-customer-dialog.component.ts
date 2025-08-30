import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-customer-dialog',
  templateUrl: './edit-customer-dialog.component.html',
  styleUrls: ['./edit-customer-dialog.component.css']
})
export class EditCustomerDialogComponent {
editForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EditCustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { customer: any }
  ) {
    this.editForm = this.fb.group({
      id: [''],
      user_first_name: ['', [Validators.required, Validators.maxLength(50)]],
      user_last_name: ['', [Validators.required, Validators.maxLength(50)]],
      user_email: ['', [Validators.required, Validators.email]],
      user_phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
      user_address: ['', [Validators.required, Validators.maxLength(200)]],
      user_pincode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]]
    });
  }

  ngOnInit(): void {
    if (this.data.customer) {
      this.editForm.patchValue(this.data.customer);
    }
  }

  onSubmit(): void {
    if (this.editForm.invalid) {
      return;
    }

    this.isLoading = true;
    const updatedCustomer = this.editForm.value;

    this.apiService.updateCustomer(updatedCustomer).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.snackBar.open('Customer updated successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.dialogRef.close(response);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error updating customer:', error);
        this.snackBar.open(
          error.error?.message || 'Failed to update customer',
          'Close',
          {
            duration: 5000,
            panelClass: ['error-snackbar']
          }
        );
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  get f() {
    return this.editForm.controls;
  }
}
