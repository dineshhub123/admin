import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../api.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sell-notification',
  templateUrl: './sell-notification.component.html',
  styleUrls: ['./sell-notification.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SellNotificationComponent implements OnInit {
public sellItemData:any
public buyerUsername: any;
  constructor(public apiService: ApiService) { }

  ngOnInit() {
    this.buyProduct()
  }

  buyProduct() {
    this.apiService.getUserBuyerDetails().subscribe((Response: any) => {
     this.sellItemData = Response
    })

  }
}
