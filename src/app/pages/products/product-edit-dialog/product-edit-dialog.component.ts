import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      shelf_code: [''],
      sizes: this.fb.array([]),

    });
    this.editForm.patchValue(this.data.product);
    this.setSizeStocks(this.data.product.variants);
  }

  get sizeStocks(): FormArray {
    return this.editForm.get('sizes') as FormArray;
  }

  private setSizeStocks(variants: any[] = []): void {
    const stocks = new Map<string, number>();

    variants.forEach(variant => {
      (variant.sizes ?? []).forEach((sizeStock: any) => {
        const size = String(sizeStock.size ?? '').trim();
        if (size) {
          stocks.set(size, (stocks.get(size) ?? 0) + (Number(sizeStock.stock) || 0));
        }
      });
    });

    stocks.forEach((stock, size) => {
      this.sizeStocks.push(this.fb.group({
        size: [size],
        stock: [stock, [Validators.required, Validators.min(0)]]
      }));
    });
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
    formData.append('product_color', selectedFiels.editColor || selectedFiels.color || '');
    formData.append('p_name', selectedFiels.product_name);
    formData.append('price', selectedFiels.product_price);
    const sizes = this.sizeStocks.getRawValue();
    const totalStock = sizes.length
      ? sizes.reduce((total: number, sizeStock: any) => total + (Number(sizeStock.stock) || 0), 0)
      : selectedFiels.stock;
    formData.append('stock', String(totalStock));
    if (sizes.length) {
      const sizePayload = sizes.map((sizeStock: any) => ({
        size: sizeStock.size,
        stock: Number(sizeStock.stock) || 0
      }));
      formData.append('sizes', JSON.stringify(sizePayload));
      formData.append('variant', JSON.stringify([{
        p_color: selectedFiels.color,
        sizes: sizePayload,
        p_stock: totalStock
      }]));
      console.log('Product size stock update:', {
        productId: selectedFiels.product_id,
        changedSizeValues: sizePayload
      });
    }
    formData.append('shelf_code', selectedFiels.shelf_code);

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
