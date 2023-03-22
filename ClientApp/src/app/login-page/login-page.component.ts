import { AuthService } from './../services/auth.service';

import { Component } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  credentials:any;

  ngOnInit(): void {
    this.credentials={};
  }

constructor(private authService:AuthService) {}
login()
{
  this.authService.login(this.credentials)
  .subscribe((r:any)=>localStorage.setItem('token',r.token));;
}
}
