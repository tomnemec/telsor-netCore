import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: any) {
    return this.http.post('', credentials);
  }
  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    let token = localStorage.getItem('token');
    let jwtHelper = new JwtHelperService();

    if (token) return true;
    else return false;
  }
  getcurrentUser() {
    let token = localStorage.getItem('token');
    if (!token) return null;
    let jwtHelper = new JwtHelperService();
    return jwtHelper.decodeToken(token);
  }
  isAdmin() {
    let user = this.getcurrentUser();
    if (user.Role != 'Admin') return false;

    return true;
  }
  isClerk() {
    let user = this.getcurrentUser();
    if (user.Role != 'Clerk') return false;

    return true;
  }
}
