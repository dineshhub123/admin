import { Component, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
// import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent {
dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
 products: any[] = [];
 displayedColumns: string[] = [
    'index',
    'product_name',
    'category',
    'images',
    'description',
    'product_mrp_price',
    'product_discount',
    'product_price',
    'delivery_date', 'Edit'
  ];
  constructor(public apiService: ApiService,) {}

  ngOnInit(): void {
    this.apiService.getProductListDetailsData(1).subscribe(data => {
  this.dataSource.data = data;
});

  }
 ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

editProduct(product: any): void {
  console.log('Edit clicked:', product);
  // Example: navigate to edit form
  // this.router.navigate(['/edit', product.id]);
}

deleteProduct(product: any): void {
  const confirmDelete = confirm(`Are you sure you want to delete "${product.id}"?`);
  if (confirmDelete) {
    console.log('Trying to delete ID:', product.id);  
    this.apiService.deleteProduct(product.id).subscribe({
      next: (res) => {
        console.log('Delete response:', res);  
        alert('Product deleted successfully.');
      },
      error: (err) => {
        console.error('Delete failed', err);  
        alert('Failed to delete product.');
      }
    });
  }
}



}
