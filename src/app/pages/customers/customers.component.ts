import { Component, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EditCustomerDialogComponent } from './edit-customer-dialog/edit-customer-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {

dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
 products: any[] = [];
 displayedColumns: string[] = [
    'index',
    'user_first_name',
    'user_last_name',
    'user_email',
    'user_phone',
    'user_address',
    'user_pincode',
    'delete'
  ];

  constructor(
  public apiService: ApiService,
  private dialog: MatDialog  ) {}

  ngOnInit(): void {
 this.getUserDetailsData();

  }
 ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

editProduct(product: any): void {
  console.log('Edit clicked:', product);
}

getUserDetailsData() {
  this.apiService.getUserDetailsData().subscribe(
    (data) => {
      this.dataSource.data = data;
      console.log(data, 'userdata');
    },
    (error) => {
      console.error('Error fetching user details:', error);
    }
  );
}
  
editCustomer(customer: any): void {
  const dialogRef = this.dialog.open(EditCustomerDialogComponent, {
    width: '600px',
    data: { customer },
    disableClose: true
  });

  dialogRef.afterClosed().subscribe((result: { id: any; }) => {
    if (result) {
      const index = this.dataSource.data.findIndex(c => c.id === result.id);
      if (index !== -1) {
        this.dataSource.data[index] = result;
      }
    }
  });
}
deleteCustomerList(userId: any): void {
  const confirmDelete = confirm(`Are you sure you want to delete "${userId.id}"?`);
  if (confirmDelete) {
    console.log('Trying to delete ID:', userId.id);  
    this.apiService.deleteCustomer(userId.id).subscribe({
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
      this.deleteCustomer()
    }, 100)

  }
}
 deleteCustomer() {
    this.apiService.getUserDetailsData().subscribe(data => {
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

