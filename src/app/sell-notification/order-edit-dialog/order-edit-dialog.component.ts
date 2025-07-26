import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-order-edit-dialog',
  templateUrl: './order-edit-dialog.component.html',
  styleUrls: ['./order-edit-dialog.component.css']
})
export class OrderEditDialogComponent {
editForm: FormGroup;
  isLoading = false;
  categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<OrderEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { order: any }
  ) {
    this.editForm = this.fb.group({
      id: [data.order.id],
      product_name: [data.order.product_name, Validators.required],
      product_mrp_price: [data.order.product_mrp_price, [Validators.required, Validators.min(0)]],
      product_price: [data.order.product_price, [Validators.required, Validators.min(0)]],
      product_discount: [data.order.product_discount, [Validators.min(0)]],
      quantity: [data.order.quantity, [Validators.required, Validators.min(1)]],
      category: [data.order.category, Validators.required],
      delivery_date: [data.order.delivery_date],
      user_first_name: [data.order.user_first_name, Validators.required],
      user_last_name: [data.order.user_last_name, Validators.required],
      user_phone: [data.order.user_phone, [Validators.required, Validators.pattern('[0-9]{10}')]],
      user_email: [data.order.user_email, [Validators.required, Validators.email]],
      user_address: [data.order.user_address, Validators.required],
      user_pincode: [data.order.user_pincode, [Validators.required, Validators.pattern('[0-9]{6}')]]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.apiService.getCategories(1).subscribe({
      next: (categories) => this.categories = categories,
      error: (error) => console.error('Error loading categories:', error)
    });
  }

  onSubmit(): void {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.apiService.updateOrder(this.editForm.value).subscribe({
      next: (response) => {
        this.snackBar.open('Order updated successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.dialogRef.close(response);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Update error:', error);
        this.snackBar.open(
          error.error?.message || 'Failed to update order',
          'Close',
          { duration: 5000, panelClass: ['error-snackbar'] }
        );
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

