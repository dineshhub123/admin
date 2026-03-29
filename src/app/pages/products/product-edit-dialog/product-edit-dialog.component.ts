import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';
import { ToastrService } from 'ngx-toastr';

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
    public ToastrService:ToastrService,
    public dialogRef: MatDialogRef<ProductEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: any }
  ) {
    this.editForm = this.fb.group({
      product_name: ['', Validators.required],
      product_id: [''],
      product_price: ['', [Validators.required]],
      color: [''],
      stock: ['', [Validators.required]],

    });
    this.editForm.patchValue(this.data.product);
  }

  ngOnInit(): void {
  }

  onUpadate(selectedFiels: any): void {
    console.log("selectedFiels", selectedFiels)
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    const formData = new FormData();
    formData.append('product_id', selectedFiels.product_id);
    formData.append('product_color', selectedFiels.color); // REQUIRED
    formData.append('p_name', selectedFiels.product_name);
    formData.append('price', selectedFiels.product_price);
    formData.append('stock', selectedFiels.stock);
    this.apiService.updateProduct(formData).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
        this.ToastrService.success(response.message)
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Update error:', error);

      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
