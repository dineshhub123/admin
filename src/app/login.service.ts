import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private TOKEN_KEY = 'admin_token';
  private loggedInSubject = new BehaviorSubject<boolean>(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  isLoggedIn$ = this.loggedInSubject.asObservable();

  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(public router: Router) {
    console.log('LoginService Instance Created');
  }

  setUser(user: any) {
    localStorage.setItem('login_admin', JSON.stringify(user));
    localStorage.setItem('isLoggedIn', 'true');
    this.loggedInSubject.next(true);
    this.userSubject.next(user);

  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('login_admin'); // optional
    this.loggedInSubject.next(false);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
  
  loadUser() {
    const user = JSON.parse(
      localStorage.getItem('login_admin') || 'null'
    );

    if (user) {
      this.loggedInSubject.next(true);
      this.userSubject.next(user);
    }
  }
}
