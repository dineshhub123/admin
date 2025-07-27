import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { StoreFormComponent } from '../store-form/store-form.component';
import { Store } from 'src/app/models/store';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { StoreService } from 'src/app/store.service';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
export class StoreListComponent {

  displayedColumns: string[] = ['name', 'address', 'phone', 'email', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Store>();
  isLoading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  snackBar: any;

  constructor(
  public storeService: StoreService,  public apiService: ApiService,
  
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadStores();
  }

  loadStores(): void {
    this.isLoading = true;
    this.apiService.getStorelist().subscribe({
      next: (stores) => {
        this.dataSource.data = stores;
         console.log(stores);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(StoreFormComponent, {
      width: '600px',
      data: { mode: 'add' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.loadStores();
      }
    });
  }

  openEditDialog(store: Store): void {
    const dialogRef = this.dialog.open(StoreFormComponent, {
      width: '600px',
      data: { mode: 'edit', store }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.loadStores();
      }
    });
  }

  deleteStore(id: number): void {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '400px',
    data: {
      title: 'Delete Store',
      message: 'Are you sure you want to permanently delete this store? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      confirmColor: 'warn'
    }
  });

  dialogRef.afterClosed().subscribe(confirmed => {
    if (confirmed) {
      this.isLoading = true;
      this.storeService.deleteStore(id).subscribe({
        next: () => {
          this.snackBar.open('Store deleted successfully', 'Close', {
            duration: 3000
          });
          this.loadStores();
        },
        error: (err) => {
          console.error('Delete error:', err);
          this.snackBar.open('Failed to delete store', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          this.isLoading = false;
        }
      });
    }
  });
}
}

