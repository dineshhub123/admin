import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-product-edit-dialog',
  templateUrl: './product-edit-dialog.component.html',
  styleUrls: ['./product-edit-dialog.component.css']
})
export class ProductEditDialogComponent {
 editForm: FormGroup;
  isLoading = false;
  categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ProductEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: any }
  ) {
    this.editForm = this.fb.group({
      id: [''],
      product_name: ['', Validators.required],
      category: ['', Validators.required],
      product_description: ['', Validators.required],
      product_mrp_price: ['', [Validators.required, Validators.min(0)]],
      product_discount: ['', [Validators.min(0)]],
      product_price: ['', [Validators.required, Validators.min(0)]],
      delivery_date: [''],
      img_front: ['']
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.editForm.patchValue(this.data.product);
    this.calculateFinalPrice();
    
    // Watch for price/discount changes
    this.editForm.get('product_mrp_price')?.valueChanges.subscribe(() => this.calculateFinalPrice());
    this.editForm.get('product_discount')?.valueChanges.subscribe(() => this.calculateFinalPrice());
  }

  loadCategories(): void {
    this.apiService.getCategories(1).subscribe(categories => {
      this.categories = categories;
    });
  }

  calculateFinalPrice(): void {
    const mrp = parseFloat(this.editForm.get('product_mrp_price')?.value) || 0;
    const discount = parseFloat(this.editForm.get('product_discount')?.value) || 0;
    const finalPrice = mrp - discount;
    this.editForm.get('product_price')?.setValue(finalPrice.toFixed(2), { emitEvent: false });
  }

  onSubmit(): void {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const formData = this.editForm.value;

    this.apiService.updateProduct(formData).subscribe({
      next: (response) => {
        this.snackBar.open('Product updated successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.dialogRef.close(response);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Update error:', error);
        this.snackBar.open(
          error.error?.message || 'Failed to update product',
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
}
