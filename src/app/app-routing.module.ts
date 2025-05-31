import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component'; 
import { AboutComponent } from './about/about/about.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { UploadComponent } from './upload/upload.component';
import { SellNotificationComponent } from './sell-notification/sell-notification.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'about', component: AboutComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'uploadproduct', component: UploadComponent },
  { path: 'customerorder', component: SellNotificationComponent },
  { path: '**', redirectTo: '404' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
