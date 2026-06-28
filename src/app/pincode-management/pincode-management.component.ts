import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddPincodeDailogComponent } from '../add-pincode-dailog/add-pincode-dailog.component';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from '../pages/settings/storesettings/confirm-dialog/confirm-dialog.component';
export interface PincodeData {
  id: number;
  pincode: number;
  area: string;
  status: boolean;
  date: string;
}

@Component({
  selector: 'app-pincode-management',
  templateUrl: './pincode-management.component.html',
  styleUrls: ['./pincode-management.component.css']
})
export class PincodeManagementComponent {
  isLoading: boolean = false;
  constructor(private dialog: MatDialog, private apiService: ApiService, public toastr: ToastrService) { }
  search = '';
  dataSource = new MatTableDataSource<PincodeData>([])
  displayedColumns: string[] = [
    'id',
    'pincode',
    'area',
    'status',
    'date',
    'action'
  ];

  ngOnInit() {
    this.picodeListData();
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  get activePincodeCount(): number {
    return this.dataSource.data.filter(item => item?.status).length;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  addPincode() {
    const dialogRef = this.dialog.open(AddPincodeDailogComponent, {
      width: '610px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // call insert API here
        this.picodeListData();
      }
    });
  }

  picodeListData() {
    this.isLoading = true;
    this.apiService.getPincodeManage().subscribe({
      next: (res: any) => {
        if (res.status === 'success') {
          this.isLoading = false;
          // Sort by ID Descending
          res.data.sort((a: any, b: any) => Number(a.id) - Number(b.id));
          this.dataSource.data = res.data;
        }
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });

  }

  edit(item: PincodeData) {
    const dialogRef = this.dialog.open(AddPincodeDailogComponent, {
      width: '610px',
      disableClose: true,
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // call insert API here
        this.picodeListData();
      }
    });

  }


  delete(row: PincodeData) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '420px',
      disableClose: true,
      data: {
        title: 'Delete Pincode',
        message: `Are you sure you want to delete "${row.area}" (${row.pincode})?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deletePincode(row.id);
      }
    });
  }
  deletePincode(id: number) {
    const payload = {
      "id": id
    }
    this.apiService.deletePincode(payload).subscribe({
      next: (res: any) => {
        if (res.status === 'success') {
          this.toastr.success(res.message);
          this.picodeListData(); // Refresh list
        } else {
          this.toastr.error(res.message);
        }
      },
      error: (err) => {
        console.error(err);
        this.toastr.error(err.error?.message || 'Something went wrong');
      }
    });
  }

}