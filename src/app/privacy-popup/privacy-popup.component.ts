import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-privacy-popup',
  templateUrl: './privacy-popup.component.html',
  styleUrls: ['./privacy-popup.component.css']
})
export class PrivacyPopupComponent {
 constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string }) {}
}
