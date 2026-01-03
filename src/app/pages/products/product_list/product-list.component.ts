import { Component, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProductEditDialogComponent } from '../product-edit-dialog/product-edit-dialog.component';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
 products: any[] = [];
 isLoading: boolean = false;
 displayedColumns: string[] = [
    'index',
    'product_id',
    'images',
    'product_name',  
    'category', 
    'product_price', 
    'stock',
    'color',
    'colorCode',
    'action'
  ];

  constructor(public apiService: ApiService,private dialog: MatDialog) {}

  ngOnInit(): void {
 this.getProductList();

  }
 ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


sanitizeHtml(html: string): string {
  return html.replace(/font-size\s*:\s*[^;"]+;?/gi, '');
}

deleteProduct(productId: any): void {
  const confirmDelete = confirm(`Are you sure you want to delete "${productId.product_id}"?`);
  if (confirmDelete) {
    console.log('Trying to delete ID:', productId.id);  
    this.apiService.deleteProduct(productId.product_id).subscribe({
      next: (res) => {
        console.log('Delete response:', res);  
        alert('Product deleted successfully.');
      },
      error: (err) => {
        console.error('Delete failed', err);  
        alert('Failed to delete product.');
      }
    });
   setTimeout(() => {
      this.getProductList()
    }, 100)

  }
}

getProductList() {
  this.isLoading = true;
  this.apiService.getProductListDetailsData().subscribe({
    next: (data: any[]) => {
      this.isLoading = false;
      const flattened = data.flatMap(product =>
          product.variants.map((v: any) => ({
          product_id: product.product_id,
          product_name: product.product_name,
          category:product.category,
          product_price: product.product_price,
          color: v.color,
          stock: v.stock,
          images: v.images,
          colorCode: v.colorCode
        }))
      );
      this.dataSource.data = flattened;
      console.log('Flattened rows:', flattened);
    },
    error: () => {
      this.isLoading = false;
    }
  });
}

applyProductSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue.includes('-') || filterValue.endsWith('+')) {
      this.dataSource.filter = filterValue.trim();
    } else {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }
editProduct(product: any): void {
  const dialogRef = this.dialog.open(ProductEditDialogComponent, {
    width: '800px',
    data: { product: { ...product } } // Pass a copy of the product
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Update the table data
      const index = this.dataSource.data.findIndex(p => p.id === result.id);
      if (index !== -1) {
        const updatedData = [...this.dataSource.data];
        updatedData[index] = result;
        this.dataSource.data = updatedData;
      }
    }
  });
}

getModifiedPath(path: string): string {
  return path.replace('new-ruralx/src', '..');
}

}
