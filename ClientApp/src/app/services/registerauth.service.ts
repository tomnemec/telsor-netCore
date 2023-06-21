import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterauthService {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate() {
    let valid = false;
    this.auth.validateUser().subscribe({
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
