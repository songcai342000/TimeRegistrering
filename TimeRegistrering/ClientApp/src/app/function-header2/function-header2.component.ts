import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../user';

@Component({
  selector: 'app-function-header2',
  templateUrl: './function-header2.component.html',
  styleUrls: ['./function-header2.component.css']
})
export class FunctionHeader2Component implements OnInit {
  userData = new User();
  userDataSubscription: any;

  constructor(private authService: AuthService) {
    this.userDataSubscription = this.authService.userData.asObservable().subscribe(data => {
      this.userData = data;
      if (data == null || data.userName === undefined && localStorage.getItem("user") != null) {
        this.userData = JSON.parse(localStorage.getItem("user"));
      }
    });
  }

  ngOnInit() {
  }

  like() {

  }

  visible() {
    document.getElementById('tooltip').style.visibility = 'visible';
  }

  invisible() {
    document.getElementById('tooltip').style.visibility = 'hidden';
  }

}
