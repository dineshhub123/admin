import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private usernameSubject = new BehaviorSubject<string  | null>(null);
  username$ = this.usernameSubject.asObservable();
  constructor() {
    this.loadUsername();
  }

  adminLoginCheckFn(mobile: any, pwd: any) {
    if (mobile == 8600245120 && pwd == "Dinesh@1609") {
      localStorage.setItem("adminMobile", mobile);
      return true;
    }
    else {
      return false;
    }
  }

  setUsername(username: string) {
    console.log(username, 'uname');
    this.usernameSubject.next(username);
    localStorage.setItem('username', username);

  }
  private getStorageUsername(): string | null {
    return localStorage.getItem("username");
  }
   loadUsername(): void {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.usernameSubject.next(storedUsername);
    }
  }
  clearUsername() {
    localStorage.removeItem('username');
    this.usernameSubject.next(null)
  }

  getUsername() {
      return this.username$
  }
  // setUserName(data: any) {
  //     this.usernameSubject.next(data);
  //     localStorage.setItem('username', data);

  // }

}
