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


@NgModule({
  declarations: [
    AppComponent,
    UploadComponent
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
