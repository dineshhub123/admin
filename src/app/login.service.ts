import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // private usernameSubject = new BehaviorSubject<string  | null>(null);
  // username$ = this.usernameSubject.asObservable();
  // constructor() {
  //   this.loadUsername();
  // }


  // setUsername(username: string) {
  //   console.log(username, 'uname');
  //   this.usernameSubject.next(username);
  //   localStorage.setItem('username', username);

  // }
  // private getStorageUsername(): string | null {
  //   return localStorage.getItem("username");
  // }
  //  loadUsername(): void {
  //   const storedUsername = localStorage.getItem('username');
  //   if (storedUsername) {
  //     this.usernameSubject.next(storedUsername);
  //   }
  // }
  // clearUsername() {
  //   localStorage.removeItem('username');
  //   this.usernameSubject.next(null)
  // }

  // getUsername() {
  //     return this.username$
  // }
  


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
    localStorage.removeItem('login_user'); // optional
    this.loggedInSubject.next(false);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

}
