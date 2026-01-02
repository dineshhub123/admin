import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { NewComponent } from './orders/new/new.component';
import { ShippedComponent } from './orders/shipped/shipped.component';
import { CancelledComponent } from './orders/cancelled/cancelled.component';
import { CategoriesComponent } from './products/categories/categories.component';
import { ReportsComponent } from './reports/reports.component';
import { SettingsComponent } from './settings/settings.component';
import { ProcessingComponent } from './orders/processing/processing.component';
import { DeliveredComponent } from './orders/delivered/delivered.component';
import { ReturnedComponent } from './orders/returned/returned.component';
import { BrandsComponent } from './products/categories/brands/brands.component';
import { LowstockComponent } from './products/lowstock/lowstock.component';
import { ReviewComponent } from './customers/review/review.component';
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

@NgModule({
  declarations: [
    NewComponent,
    ShippedComponent,
    CancelledComponent,
    UploadProductComponent,
    CategoriesComponent,
    ReportsComponent,
    SettingsComponent,
    ProcessingComponent,
    DeliveredComponent,
    ReturnedComponent,
    BrandsComponent,
    LowstockComponent,
    ReviewComponent,
    StoresettingsComponent,
    SecurityComponent,
    ReviewsComponent,
    InvoiceComponent,
    OrderTrackingComponent,
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
    MatDividerModule
]
})
export class PagesModule { }
