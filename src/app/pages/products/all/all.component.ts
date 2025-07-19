import { Component, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


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
    'delivery_date',
    'delete'
  ];
  constructor(public apiService: ApiService,) {}

  ngOnInit(): void {
 this.getProductList();

  }
 ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

editProduct(product: any): void {
  console.log('Edit clicked:', product);
}


deleteProduct(productId: any): void {
  const confirmDelete = confirm(`Are you sure you want to delete "${productId.id}"?`);
  if (confirmDelete) {
    console.log('Trying to delete ID:', productId.id);  
    this.apiService.deleteProduct(productId.id).subscribe({
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
    this.apiService.getProductListDetailsData(1).subscribe(data => {
  this.dataSource.data = data;
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
}
