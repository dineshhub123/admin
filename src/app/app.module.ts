import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { environment } from 'src/environments/environment'; 
import { MaterialModule } from './shared/material.module';
import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ErrorModule } from './error/error.module';
import { FormsModule } from '@angular/forms';
import { LoginModule } from './login/login.module';
import { SignupModule } from './signup/signup.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FirstLiPipe } from './first-li.pipe';
import { FullLiPipe } from './full-li.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxEchartsModule } from 'ngx-echarts';
import { SalereportsComponent } from './pages/reports/salereports/salereports.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { CustomersComponent } from './pages/customers/customers.component';
import { PrivacyPopupComponent } from './privacy-popup/privacy-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { OrderViewComponent } from './pages/orders/order-view/order-view.component';
import { MatChipsModule } from '@angular/material/chips';
import { EditCustomerDialogComponent } from './pages/customers/edit-customer-dialog/edit-customer-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductEditDialogComponent } from './pages/products/product-edit-dialog/product-edit-dialog.component';
import { ConfirmDialogComponent } from './pages/settings/storesettings/confirm-dialog/confirm-dialog.component';
import { StoreFormComponent } from './pages/settings/storesettings/store-form/store-form.component';
import { StoreListComponent } from './pages/settings/storesettings/store-list/store-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReplacePathPipe } from './replace-path.pipe';
import { OrderlistComponent } from './pages/orders/orderlist/orderlist.component';
import { OrderStatusStepperComponent } from './pages/orders/order-status-stepper/order-status-stepper.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductListComponent } from './pages/products/product_list/product-list.component';
import { UploadComponent } from './pages/products/upload_product/upload_product.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EmployeeDetailsComponent } from './pages/employee/employee-details/employee-details.component';
import { EmployeeAddComponent } from './pages/employee/employee/employee-add/employee-add.component';
import { EmployeeDeleteComponent } from './pages/employee/employee/employee-delete/employee-delete.component';
import { EmployeeEditComponent } from './pages/employee/employee/employee-edit/employee-edit.component';
import { EmployeeListComponent } from './pages/employee/employee/employee-list/employee-list.component';
import { InvoiceComponent } from './pages/orders/invoice/invoice.component';
import { SafePipe } from './safe.pipe';
@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    ProductListComponent,
    SalereportsComponent,
    CustomersComponent,
    FirstLiPipe,
    FullLiPipe,
    PrivacyPopupComponent,
    OrderViewComponent,
    EditCustomerDialogComponent,
    ProductEditDialogComponent,
    StoreFormComponent,
    ConfirmDialogComponent,
    StoreListComponent,
    OrderlistComponent,
    OrderStatusStepperComponent,
    EmployeeListComponent,
    EmployeeAddComponent,
    EmployeeEditComponent,
    EmployeeDeleteComponent,
    EmployeeDetailsComponent,
    InvoiceComponent,
    ReplacePathPipe,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    CommonModule,
    DashboardModule,
    ErrorModule,
    LoginModule,
    SignupModule,
    HttpClientModule,
    AngularEditorModule,
    MatMenuModule,
    MatListModule,
    MatBadgeModule,
    MatTooltipModule,
    MatExpansionModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatDividerModule,
    MatSortModule,
    MatSelectModule,
    MatChipsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right', // 👈 BOTTOM RIGHT
      timeOut: 1000,                        // optional: duration in ms
      closeButton: true,                    // optional: close button
      progressBar: true                     // optional: progress bar
    }), // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
