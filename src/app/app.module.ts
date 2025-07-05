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
import { AboutModule } from './about/about.module';
import { FormsModule } from '@angular/forms';
import { LoginModule } from './login/login.module';
import { SignupModule } from './signup/signup.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { UploadComponent } from './upload/upload.component';
import {AngularEditorModule } from '@kolkov/angular-editor';
import { SellNotificationComponent } from './sell-notification/sell-notification.component';
import { FirstLiPipe } from './first-li.pipe';
import { FullLiPipe } from './full-li.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { AllComponent } from './pages/products/all/all.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { SalereportsComponent } from './pages/reports/salereports/salereports.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    SellNotificationComponent,AllComponent,SalereportsComponent,
    FirstLiPipe,
    FullLiPipe
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
    AboutModule,
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
