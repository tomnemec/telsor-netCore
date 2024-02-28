import { NumbersMDService } from './services/numbers-md.service';
import { AdminauthService } from './services/adminhauth.service';
import { RegisterauthService } from './services/registerauth.service';
import { AuthService } from './services/auth.service';
import { DepartmentsService } from './services/departments.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './pages/home/home.component';
import { FetchDataComponent } from './pages/fetch-data/fetch-data.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataComponent } from './data/data.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SingleRecordComponent } from './pages/single-record/single-record.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { AsignerComponent } from './pages/asigner/asigner.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FetchDataComponent,
    LoginPageComponent,
    DataComponent,
    NotFoundComponent,
    SingleRecordComponent,
    ReportsComponent,
    AsignerComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    MatProgressSpinnerModule,
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
        canActivate: [RegisterauthService],
      },
      {
        path: 'data',
        component: DataComponent,
        canActivate: [AdminauthService],
      },
      {
        path: 'reports',
        component: ReportsComponent,
        canActivate: [RegisterauthService],
      },
      {
        path: 'data/:id',
        component: SingleRecordComponent,
        canActivate: [AdminauthService],
      },
      {
        path: 'asigner',
        component: AsignerComponent,
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
    AdminauthService,
    NumbersMDService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
