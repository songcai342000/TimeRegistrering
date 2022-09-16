import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})

export class UserHomeComponent implements OnInit {

  userData: any;

  constructor(private userService: UserService) { }

  ngOnInit() {

  }

  fetchUserData() {
    this.userService.getUserData().subscribe(
      userData => this.userData = userData
    )
  }
  
}     
