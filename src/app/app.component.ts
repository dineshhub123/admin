import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
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
  expandedPanel: string = '';

 public data:any;
  public retrieveResonse:any;
  public base64Data:any;
  public retrievedImage:any;
  public imageUrl = null;
  public selectedFile:any;
  public sellItemData:any
  public buyerUsername: any;
  public getNotifyUserArray:any;
  constructor(
  public router:Router, 
  private http:HttpClient,
  private _DomSanitizationService:DomSanitizer, 
  public apiService: ApiService, 
  private loginService: LoginService) 
  { console.log(this.router.url, 'url');
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setExpandedPanel(event.urlAfterRedirects);
      }
    });
}
  ngOnInit():void {
    this.setExpandedPanel(this.router.url);
     this.userlist()
      this.loginService.getUsername().subscribe((name) => {
      this.username = name;
    });

  }

  setExpandedPanel(url: string): void {
console.log(url, 'url')
    if (url.includes('/orders')) {
      this.expandedPanel = 'orders';
    } else if (url.includes('/products')) {
      this.expandedPanel = 'products';
    } else if (url.includes('/customers')) {
      this.expandedPanel = 'customers';
    } else if (url.includes('/reports')) {
      this.expandedPanel = 'reports';
    } else if (url.includes('/settings')) {
      this.expandedPanel = 'settings';
    } else {
      this.expandedPanel = 'dashboard';
    }
  }

  isExpanded(panel: string): boolean {
    return this.expandedPanel === panel;
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
  user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://i.pravatar.cc/100?img=3',
  };

  notifications = [
    {
      avatar: 'https://i.pravatar.cc/100?img=4',
      message: 'Anna sent you a message',
      time: 'Just now',
      read: true,
    },
    {
      avatar: 'https://i.pravatar.cc/100?img=5',
      message: 'Password changed successfully',
      time: '5 min ago',
      read: true,
    },
    {
      avatar: 'https://i.pravatar.cc/100?img=6',
      message: 'Welcome to our platform!',
      time: '1 day ago',
      read: true,
    },
  ];

  clearAll() {
    this.notifications = [];
  }

  goToSettings() {
    // Navigate to settings
    console.log('Redirecting to settings...');
  }
}




