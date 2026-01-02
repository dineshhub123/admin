import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component'; 
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { SalereportsComponent } from './pages/reports/salereports/salereports.component';
import { OrderViewComponent } from './pages/orders/order-view/order-view.component';
import { StoreListComponent } from './pages/settings/storesettings/store-list/store-list.component';
import { StoreFormComponent } from './pages/settings/storesettings/store-form/store-form.component';
import { OrderlistComponent } from './pages/orders/orderlist/orderlist.component';
import { ProductListComponent } from './pages/products/product_list/product-list.component';
import { UploadProductComponent } from './pages/products/add_product/upload-product.component';
import { UploadComponent } from './pages/products/upload_product/upload_product.component';
import { AuthGuard } from './login/auth.guard';
import { EditCustomerDialogComponent } from './pages/customers/edit-customer-dialog/edit-customer-dialog.component';
import { InvoiceComponent } from './pages/orders/invoice/invoice.component';
import { ShippingLabelComponent } from './pages/orders/shipping-lable/shipping-label.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: '404', component: PageNotFoundComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'uploadproduct', component: UploadComponent, canActivate: [AuthGuard] },
  { path: 'orderlist', component: OrderlistComponent, canActivate: [AuthGuard] },
  { path: 'orders/orderview/:order_id', component: OrderViewComponent, canActivate: [AuthGuard] },
  { path: 'productlist', component: ProductListComponent, canActivate: [AuthGuard] },
  { path: 'uploadproduct', component: UploadProductComponent, canActivate: [AuthGuard] },
  { path: 'customers', component: CustomersComponent, canActivate: [AuthGuard] },
   { path: 'customers/edit/:id', component: EditCustomerDialogComponent, canActivate: [AuthGuard] },
  { path: 'salesreport', component: SalereportsComponent, canActivate: [AuthGuard] },
  { path: 'settings/stores', component: StoreListComponent, canActivate: [AuthGuard] },
  { path: 'settings/stores/add', component: StoreFormComponent, canActivate: [AuthGuard] },
  { path: 'settings/stores/edit/:id', component: StoreFormComponent, canActivate: [AuthGuard] },
  { path: 'invoice', component: InvoiceComponent },
  { path: 'address-label', component: ShippingLabelComponent },
  { path: '', redirectTo: '/stores', pathMatch: 'full' },
  { path: '**', redirectTo: '404' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
