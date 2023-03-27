// src/app/auth/auth-guard.service.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable()
export class ClerkauthService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    if (
      !this.auth.isLoggedIn() ||
      !this.auth.isClerk() ||
      !this.auth.isAdmin()
    ) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
