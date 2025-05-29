import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'material-ui-angular';
  constructor(private router:Router) { }

  adminLogout(){
    localStorage.removeItem('adminMobile');
    this.router.navigate(["login"]);
  }

}

