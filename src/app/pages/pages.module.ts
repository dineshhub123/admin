import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { NewComponent } from './orders/new/new.component';
import { CancelledComponent } from './orders/cancelled/cancelled.component';
import { CategoriesComponent } from './products/categories/categories.component';
import { ReportsComponent } from './reports/reports.component';
import { SettingsComponent } from './settings/settings.component';
import { DeliveredComponent } from './orders/delivered/delivered.component';
import { BrandsComponent } from './products/categories/brands/brands.component';
import { LowstockComponent } from './products/lowstock/lowstock.component';
import { StoresettingsComponent } from './settings/storesettings/storesettings.component';
import { SecurityComponent } from './settings/storesettings/security/security.component';
import { ReviewsComponent } from './customers/reviews/reviews.component';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatIconModule } from '@angular/material/icon';
import { InvoiceComponent } from './orders/invoice/invoice.component';
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatDividerModule } from "@angular/material/divider";
import { OrderTrackingComponent } from './orders/order-tracking/order-tracking.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UploadProductComponent } from './products/add_product/upload-product.component';
import { StoreListComponent } from './settings/storesettings/store-list/store-list.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { OrderlistComponent } from './orders/orderlist/orderlist.component';

@NgModule({
  declarations: [
    NewComponent,
    CancelledComponent,
    UploadProductComponent,
    CategoriesComponent,
    ReportsComponent,
    SettingsComponent,
    DeliveredComponent,
    BrandsComponent,
    LowstockComponent,
    StoresettingsComponent,
    SecurityComponent,
    ReviewsComponent,
    InvoiceComponent,
    OrderTrackingComponent,
    StoreListComponent,
    OrderlistComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    HttpClientModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    NgxEchartsModule.forRoot({
        echarts: () => import('echarts')
    }),
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatProgressBarModule
]
})
export class PagesModule { }
