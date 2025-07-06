import { Component, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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
    'user_pincode'
  ];
  constructor(public apiService: ApiService,) {}

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

 
applyProductSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue.includes('-') || filterValue.endsWith('+')) {
      this.dataSource.filter = filterValue.trim();
    } else {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }
}

