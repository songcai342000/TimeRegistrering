import { Component, OnInit } from '@angular/core';
import { UserRole } from '../role';
import { AuthService } from '../services/auth.service';
import { User } from '../user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isExpanded = false;
  userDataSubscription: any;
  userData = new User();
  userRole = UserRole;

  constructor(private authService: AuthService) {
    this.userDataSubscription = this.authService.userData.asObservable().subscribe(data => {
      this.userData = data;
      if (data == null || data.userName === undefined && localStorage.getItem("user") != null) {
        this.userData = JSON.parse(localStorage.getItem("user"));
      }
    });
  }
    ngOnInit(): void {
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
