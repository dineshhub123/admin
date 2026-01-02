import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { LoginService } from './login.service';
import { FcmService } from './fcm.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'material-ui-angular';
  username: string | null = '';
  expandedPanel: string = '';

  public data: any;
  public retrieveResonse: any;
  public base64Data: any;
  public retrievedImage: any;
  public imageUrl = null;
  public selectedFile: any;
  public sellItemData: any
  public buyerUsername: any;
  public getNotifyUserArray: any;
  public pendingOrders: any[] = [];
  public pendingOrderCount = 0;
  public showDropdown = false;
  public isLoggedIn:boolean = false
  constructor(
    public router: Router,
    private http: HttpClient,
    private _DomSanitizationService: DomSanitizer,
    public apiService: ApiService,
    private loginService: LoginService,
    private fcm: FcmService,
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setExpandedPanel(event.urlAfterRedirects);
      }
    });
  }
  ngOnInit(): void {
    this.loginService.isLoggedIn$.subscribe(status => {
       this.isLoggedIn = status;
  });
    this.setExpandedPanel(this.router.url);
    // this.loginService.getUsername().subscribe((name) => {
    //   this.username = name;
    // });
    const adminId = 1; // logged-in admin
    this.fcm.initFCM(adminId);
    // VERY IMPORTANT: attach foreground listener
    this.fcm.listenMessages();
    this.getPendingOrdersPreview();
    // 🔔 when notification arrives
    this.fcm.message$.subscribe(() => {
      this.getPendingOrdersPreview();
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


logout() {
  this.loginService.logout();
  this.router.navigate(['/login']);
}
  notification() {
    this.router.navigate(["sell-notification"]);

  }
  upload() {
    this.router.navigate(["upload"]);
  }
  getPendingOrdersPreview() {
    this.apiService.getPendingOrder().subscribe(res => {
      this.pendingOrders = res;
      this.pendingOrderCount = res.length;
      console.log("pending", res)
    })
  }
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  goToOrders() {
    this.router.navigate(['./orderlist']);
    this.showDropdown = false;
  }

  goToOrder(orderId: number) {
    this.router.navigate(['./orderlist', orderId]);
    this.showDropdown = false;
  }

  goToSettings() {
    // Navigate to settings
    console.log('Redirecting to settings...');
  }
}




