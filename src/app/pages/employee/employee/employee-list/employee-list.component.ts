import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/api.service';
import { EmployeeDeleteComponent } from '../employee-delete/employee-delete.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
employeeId:any;
  displayedColumns: string[] = [
    'employee_id',
    'full_name',
    'mobile',
    'email',
    'actions'
  ];

  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(
     private route: ActivatedRoute,  
     public apiService: ApiService,
    private router: Router, private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadEmployees();
  }
 ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.loadEmployees();
  }

loadEmployees() {
  this.apiService.getEmployees().subscribe({
    next: (res: any) => {
      console.log('API RESPONSE', res);
      try {
        if (res && Array.isArray(res.data)) {
          this.dataSource.data = res.data;
        } else if (Array.isArray(res)) {
          this.dataSource.data = res;
        } else {
          this.dataSource.data = [];
        }
      } catch (e) {
        console.error('Parsing error', e);
        this.dataSource.data = [];
      }
    },
    error: (err) => {
      console.error('API ERROR', err);
      this.dataSource.data = [];
    }
  });
}


viewEmployee(row: any) {
  alert('Clicked');          
  console.log('ROW =>', row);
  console.log('ID =>', row?.id);

  this.router.navigate(['/employee/view', row.id]);
}

  editEmployee(row: any) {
    this.router.navigate(['/employee/edit',  row.id]);
  }

openDeleteDialog(employee: any) {
  this.dialog.open(EmployeeDeleteComponent, {
    width: '400px',
    data: {
      id: employee.id,                 // ✅ number
      employeeId: employee.employeeId  // optional (display only)
    }
  }).afterClosed().subscribe((deleted) => {
    if (deleted) {
      this.loadEmployees();
    }
  });
}


}
