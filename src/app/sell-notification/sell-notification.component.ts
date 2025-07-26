import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { OrderEditDialogComponent } from './order-edit-dialog/order-edit-dialog.component';

@Component({
  selector: 'app-sell-notification',
  templateUrl: './sell-notification.component.html',
  styleUrls: ['./sell-notification.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SellNotificationComponent implements OnInit {
sellItemData = new MatTableDataSource<any>(); 
  public buyerUsername: any;
  public selectedPriceRange: string = '';

   @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;
  dataSource: any;
  constructor(public apiService: ApiService, private cdRef: ChangeDetectorRef, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,  private dialog: MatDialog,) { iconRegistry.addSvgIcon('eye', sanitizer.bypassSecurityTrustResourceUrl('assets/eye.svg'));
  iconRegistry.addSvgIcon('eye-off', sanitizer.bypassSecurityTrustResourceUrl('assets/eye-off.svg')); }

  ngOnInit() {
    this.buyProduct()
    this.loadData();
  }
buyProduct(): void {
  this.apiService.getUserBuyerDetails().subscribe((response: any) => {
    this.sellItemData.data = response; // Update the data property
    
    // Set custom filterPredicate
    this.sellItemData.filterPredicate = (data: any, filter: string): boolean => {
      if (!filter) return true;

      if (filter.endsWith('+')) {
        const min = parseInt(filter.replace('+', ''), 10);
        return data.price >= min;
      }

      const [min, max] = filter.split('-').map(Number);
      return data.price >= min && data.price <= max;
    };
  });
}
  ngAfterViewInit(): void {
    this.sellItemData.paginator = this.paginator;
    this.sellItemData.sort = this.sort;
  }

applySearch(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    const value = (event.target as HTMLInputElement).value;
    // Perform search
  }
}
applyFilter(): void {
  this.sellItemData.filter = this.selectedPriceRange;
}

 loadData(): void {
    this.apiService.getUserBuyerDetails().subscribe((data: any) => {
      this.sellItemData.data = data;
      console.log(data ,'data');
    });

  }
deleteOrder(orderId: any): void {
  const confirmDelete = confirm(`Are you sure you want to delete "${orderId.id}"?`);
  if (confirmDelete) {
    console.log('Trying to delete ID:', orderId.id);  
    this.apiService.deleteOrder(orderId.id).subscribe({
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
      this.deleteOrderList()
    }, 100)

  }
}
editOrder(order: any): void {
  const dialogRef = this.dialog.open(OrderEditDialogComponent, {
    width: '900px',
    data: { order: { ...order } } // Pass a copy of the order
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Update the table data
      const index = this.sellItemData.data.findIndex(o => o.id === result.id);
      if (index !== -1) {
        const updatedData = [...this.sellItemData.data];
        updatedData[index] = result;
        this.sellItemData.data = updatedData;
      }
    }
  });
}
 deleteOrderList() {
    this.apiService.ProductBuyerDetails(1).subscribe(data => {
  this.dataSource.data = data;
  });

  }

}
