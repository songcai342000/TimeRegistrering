import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData = new BehaviorSubject<User>(new User());
  constructor(private http: HttpClient, private router: Router) { }

  login(userDetails) {
    return this.http.post<any>('/api/login', userDetails)
      .pipe(map(response => {
        localStorage.setItem('authToken', response.token);
        this.setUserDetails(response.token);
        return response;
      }));
  }
  
  setUserDetails(token: any) {
    if (token != null && token != "") {
      const userDetails = new User();
      const decodeUserDetails = JSON.parse(window.atob(token.split('.')[1]));
      userDetails.userName = decodeUserDetails.sub;
      localStorage.setItem("userName", userDetails.userName);
      userDetails.userId = decodeUserDetails.userId;
      userDetails.isLoggedIn = true;
      userDetails.role = decodeUserDetails.role;
      localStorage.setItem("user", JSON.stringify(userDetails));
      this.userData.next(userDetails);
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
    this.userData.next(new User());
  }
}
