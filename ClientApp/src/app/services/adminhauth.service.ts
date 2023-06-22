// src/app/auth/auth-guard.service.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable()
export class AdminauthService {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate() {
    let valid = false;
    this.auth.validateAdmin().subscribe({
      next: (r: any) => {
        valid = r;
        this.check(r);
      },
      error: (e: any) => console.log(e),
    });
  }
  check(input: any) {
    if (!input) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
