import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

   private loggedInSubject = new BehaviorSubject<boolean>(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  isLoggedIn$ = this.loggedInSubject.asObservable();

  constructor() {}

  login() {
    localStorage.setItem('isLoggedIn', 'true');
    this.loggedInSubject.next(true);
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('login_admin'); // optional
    this.loggedInSubject.next(false);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

}
