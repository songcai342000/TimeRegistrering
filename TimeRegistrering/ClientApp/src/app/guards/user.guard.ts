import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserRole } from '../role';
import { AuthService } from '../services/auth.service';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})

export class UserGuard implements CanActivate {
  userDataSubscription: any;
  userData = new User();
  constructor(private router: Router, private authService: AuthService) {
    this.userDataSubscription = this.authService.userData.asObservable().subscribe(data => {
      this.userData = data;
      if (data == null || data.userName === undefined) {
        this.userData = JSON.parse(localStorage.getItem("user"));
        if (this.userData.role != 'User') {
          alert('You are not allowed to access the page');
          this.authService.logout();
        }
      }
    });
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.userData.role == UserRole.User) {
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}    
