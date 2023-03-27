import { AdminauthService } from './services/adminhauth.service';
import { RegisterauthService } from './services/registerauth.service';
import { ClerkauthService } from './services/clerkauth.service';
import { AuthService } from './services/auth.service';
import { DepartmentsService } from './services/departments.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { LoginPageComponent } from './login-page/login-page.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataComponent } from './data/data.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FetchDataComponent,
    LoginPageComponent,
    DataComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    ClipboardModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
        canActivate: [RegisterauthService],
      },
      {
        path: 'fetch-data',
        component: FetchDataComponent,
        canActivate: [ClerkauthService],
      },
      {
        path: 'data',
        component: DataComponent,
        canActivate: [AdminauthService],
      },
      { path: 'login', component: LoginPageComponent },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ]),
  ],
  providers: [
    DepartmentsService,
    AuthService,
    RegisterauthService,
    ClerkauthService,
    AdminauthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
