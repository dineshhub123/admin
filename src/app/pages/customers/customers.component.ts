import { Component, ViewChild , AfterViewInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {
constructor(private apiService:ApiService){}
public reviews:any[] = [];
public isAdmin:boolean = true;
dataSource = new MatTableDataSource<any>();
@ViewChild(MatPaginator) paginator!: MatPaginator;
displayedColumns: string[] = [
  'user',
  'product',
  'rating',
  'title',
  'review',
  'date',
  'helpful',
  'action'
];
ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}

ngOnInit(){
  this.getProductReview();
}
approveReview(review: any) {
  this.apiService.approveReview(review.id).subscribe((res: any) => {
    if (res.status) {
      review.verified_purchase = 1;
    }
  });
}

rejectReview(review: any) {
  this.apiService.rejectReview(review.id).subscribe((res: any) => {
    if (res.status) {
      review.verified_purchase = -1;
    }
  });
}
  getProductReview() {
    try {
      this.apiService.getProductReview().subscribe((res) => {
        this.dataSource.data= res?.data;
      })
    } catch (err) {
      console.log(err)
    }
  }

}

