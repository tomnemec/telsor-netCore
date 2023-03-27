import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent {
  isExpanded = false;
  isLoged = false;

  user: any;

  constructor(public authService: AuthService) {}
  ngOnInit(): void {
    this.isLoged = this.authService.isLoggedIn();
    this.user = this.authService.getcurrentUser();
  }

  collapse() {
    this.isExpanded = false;
  }
  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  logout() {
    this.authService.logout();
  }
}
