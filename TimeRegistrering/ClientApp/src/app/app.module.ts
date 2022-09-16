import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MoreinforModule } from './moreinfor/moreinfor.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DeleteComponent } from './delete/delete.component';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { FootComponent } from './foot/foot.component';
import { LoginComponent } from './login/login.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { UserGuard } from './guards/user.guard';
import { AdminGuard } from './guards/admin.guard';
import { FunctionHeader1Component } from './function-header1/function-header1.component';
import { FunctionHeader2Component } from './function-header2/function-header2.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SearchDashboardModule } from './search-dashboard/search-dashboard.module';
import { ListComponent } from './search-dashboard/list/list.component';
import { MoreinforComponent } from './moreinfor/moreinfor.component';
import { SearchComponent } from './search-dashboard/search/search.component';
import { Subfooter1Component } from './subfooter1/subfooter1.component';
import { Subfooter2Component } from './subfooter2/subfooter2.component';
import { Subfooter3Component } from './subfooter3/subfooter3.component';
import { Subfooter4Component } from './subfooter4/subfooter4.component';
import { Subfooter5Component } from './subfooter5/subfooter5.component';
import { AlltimesheetsComponent } from './alltimesheets/alltimesheets.component';
import { HttpInterceptorService } from './services/http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FootComponent,
    DeleteComponent,
    LoginComponent,
    UserHomeComponent,
    AdminHomeComponent,
    FunctionHeader1Component,
    FunctionHeader2Component,
    SidebarComponent,
    Subfooter1Component,
    Subfooter2Component,
    Subfooter3Component,
    Subfooter4Component,
    Subfooter5Component,
    AlltimesheetsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SearchDashboardModule,
    MoreinforModule,
    RouterModule.forRoot([
      { path: 'moreinfor', loadChildren: () => import('./moreinfor/moreinfor.module').then(m => m.MoreinforModule) },
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'moreinfor', component:MoreinforComponent },
      { path: 'delete', component: DeleteComponent },
      { path: 'delete/:id', component: DeleteComponent },
      { path: 'search-dashboard/list', component: ListComponent },
      { path: 'login', component: LoginComponent },
      { path: 'alltimesheets', component: AlltimesheetsComponent },
      { path: 'user-home', component: UserHomeComponent, canActivate: [UserGuard] },
      { path: 'admin-home', component: AdminHomeComponent, canActivate: [AdminGuard] }  
    ])
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }],
  entryComponents: [SearchComponent],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
