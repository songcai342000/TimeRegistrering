import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from '../user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  /*myAppUrl = '';*/
  userDataSubscription: any;
  userData: User;

  constructor(private authService: AuthService, private http: HttpClient) {
    this.userDataSubscription = this.authService.userData.asObservable().subscribe(data => {
      this.userData = data;
      if (data == null || data.userName === undefined && localStorage.getItem("user") != null) {
        this.userData = JSON.parse(localStorage.getItem("user"));
      }
    });
  }

  getUserData() {
    return this.http.get('api/User/GetUserData');
  }

  getAdminData() {
    return this.http.get('api/User/GetAdminData').pipe(map(result => result));
  }

  getUserTimeSheets() {
    return this.http.get('api/User/GetUserTimeSheets');
  }
}
