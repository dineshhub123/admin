import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';
import { ApiService } from './api.service';
import { LoginService } from './login.service';
import { FcmService } from './fcm.service';
import { OrderNotificationService } from './order-notification.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'material-ui-angular';
  username: string | null = '';
  expandedPanel: string = '';
  private msgSub!: Subscription;
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
  public isLoggedIn: boolean = false
  public userName: string = '';
  public firstUserName: string = '';
  public avatarLetter: string = '';
  public role: any;
  constructor(
    public router: Router,
    private http: HttpClient,
    private _DomSanitizationService: DomSanitizer,
    public apiService: ApiService,
    private loginService: LoginService,
    private fcm: FcmService,
    private orderNotify: OrderNotificationService,
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setExpandedPanel(event.urlAfterRedirects);
      }
    });
  }
  ngOnInit(): void {
    this.getPendingOrdersPreview();
    this.orderNotify.pendingCount$.subscribe((c: any) => this.pendingOrderCount = c);
    this.orderNotify.preview$.subscribe(list => this.pendingOrders = list);
    this.loginService.loadUser();
    this.loginService.user$.subscribe((userData: any) => {
      if (userData) {
        const user = userData;
        this.role = user?.role
        // First Name & Last Name For Left Panel 
        this.userName = `${user.name}`;
        // First Name For Logout Pop Up
        this.firstUserName = `${user.name}`;
        // First letter of first name in CAPITAL
        this.avatarLetter = user.name?.charAt(0)?.toUpperCase();
        this.setExpandedPanel(this.router.url);
        const adminId = user.admin_id; // logged-in admin
        this.fcm.initFCM(adminId);
        // VERY IMPORTANT: attach foreground listener
        this.fcm.listenMessages();
        this.getPendingOrdersPreview();

        // 🔔 when notification arrives
        this.msgSub = this.fcm.message$.subscribe(() => {
          this.getPendingOrdersPreview();
        });

      }
    });

  }

  ngOnDestroy() {
    if (this.msgSub) this.msgSub.unsubscribe();
  }

  setExpandedPanel(url: string): void {
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
  getPendingOrdersPreview() {
    this.apiService.getPendingOrder().subscribe(res => {
      this.orderNotify.setPendingOrders(res);
    })
  }
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  goToOrderView(orderId: number) {
    this.router.navigate(['./orderlist/orderview', orderId]);
    this.showDropdown = false;
  }

  goToOrderList() {
    this.router.navigate(['./orderlist']);
    this.showDropdown = false;
  }

}




