import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpEventType } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'material-ui-angular';
  username: string | null = '';
 public data:any;
  public retrieveResonse:any;
  public base64Data:any;
  public retrievedImage:any;
  public imageUrl = null;
  public selectedFile:any;
  public sellItemData:any
  public buyerUsername: any;
 public getNotifyUserArray:any;
  constructor(private router:Router, private http:HttpClient,private _DomSanitizationService:DomSanitizer, public apiService: ApiService, private loginService: LoginService) { }
  ngOnInit():void {
     this.userlist()
      this.loginService.getUsername().subscribe((name) => {
      this.username = name;
      console.log(name, 'username');
    });
  }

  adminLogout(){
    localStorage.removeItem('adminMobile');
    this.router.navigate(["login"]);
  }
 notification(){
    this.router.navigate(["sell-notification"]);
  
  }
  upload(){
    this.router.navigate(["upload"]);
  }
  

  userlist() {
    this.apiService.getUserBuyerDetails().subscribe((Response: any) => {
     this.sellItemData = Response
     let userlistData=this.sellItemData.map((item: any) => 
     item.user_first_name)
     let removeDuplicates=new Set(userlistData)
     this.buyerUsername=[...removeDuplicates];
    this.getNotifyUserArray = []; 
     for (let i = 0; i < this.buyerUsername.length; i++) {
    let  getNotifyUser=this.sellItemData.find((item:any) => item.user_first_name=== this.buyerUsername[i])
    if (getNotifyUser) {
    this.getNotifyUserArray.push(getNotifyUser);
  }
   
    }
});}


  openNotification() {

  }

  closeNotification() {
    
  }
}

