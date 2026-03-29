import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private TOKEN_KEY = 'admin_token';
  constructor() {}
  /* Save Token */
  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
  /* Get Token */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  /* Check Login */
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
  /* Logout */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem('login_admin');
    localStorage.setItem('isLoggedIn', 'false');

  }

}