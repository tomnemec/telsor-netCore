import { AuthService } from '../../services/auth.service';

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  credentials: any;
  invalidCredintials = false;

  ngOnInit(): void {
    this.credentials = {};
    this.authService.validateUser().subscribe((r: any) => {});
  }

  constructor(private authService: AuthService, private route: Router) {}
  login() {
    this.authService.login(this.credentials).subscribe(
      (r: any) => {
        localStorage.setItem('token', r.token);
        this.route.navigate(['']);
      },
      (error: any) => {
        if (error.status === 401) {
          this.invalidCredintials = true;
        }
      }
    );
  }
}
