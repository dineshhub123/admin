import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component'; 
import { AboutComponent } from './about/about/about.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { UploadComponent } from './upload/upload.component';
import { SellNotificationComponent } from './sell-notification/sell-notification.component';
import { NewComponent } from './pages/orders/new/new.component';
import { ShippedComponent } from './pages/orders/shipped/shipped.component';
import { CancelledComponent } from './pages/orders/cancelled/cancelled.component';
import { AllComponent } from './pages/products/all/all.component';
import { AddComponent } from './pages/products/add/add.component';
import { CategoriesComponent } from './pages/products/categories/categories.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ProcessingComponent } from './pages/orders/processing/processing.component';
import { DeliveredComponent } from './pages/orders/delivered/delivered.component';
import { ReturnedComponent } from './pages/orders/returned/returned.component';
import { BrandsComponent } from './pages/products/categories/brands/brands.component';
import { LowstockComponent } from './pages/products/lowstock/lowstock.component';
import { ReviewsComponent } from './pages/customers/reviews/reviews.component';
import { SalereportsComponent } from './pages/reports/salereports/salereports.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'about', component: AboutComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'uploadproduct', component: UploadComponent },
  { path: 'customerorder', component: SellNotificationComponent },
  { path: 'orders/new', component: NewComponent },
  { path: 'orders/shipped', component: ShippedComponent },
  { path: 'orders/cancelled', component: CancelledComponent },
  { path: 'orders/processing', component: ProcessingComponent },
  { path: 'orders/delivered', component: DeliveredComponent },
  { path: 'orders/returned', component: ReturnedComponent },
  { path: 'products/all', component: AllComponent },
  { path: 'products/add', component: AddComponent },
  { path: 'products/categories', component: CategoriesComponent },
  { path: 'products/categories/brands', component: BrandsComponent },
  { path: 'products/low-stock', component: LowstockComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'customers/reviews', component: ReviewsComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'reports/sales', component: SalereportsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', redirectTo: '404' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
