import { Component, HostListener, OnInit, Output } from '@angular/core';
import { Data, Router } from '@angular/router';
import { EventEmitter } from 'events';
import { TimeService } from '../services/time.service';
import { TimeRegistration } from '../timeRegistration';
import { User } from '../user';

@Component({
  selector: 'app-function-header1',
  templateUrl: './function-header1.component.html',
  styleUrls: ['./function-header1.component.css']
})
export class FunctionHeader1Component implements OnInit {
  [x: string]: any;
  earliestDate: Date;
  userDataSubscription: any;
  userData: User;
  project: string;
  com: string;
  hrs: number;
  userId: number = 0;
  registrationId: number;
  time: Date = new Date(Date.now());
  //dateWidth: string = '50px';


  constructor(private router: Router, private timeService: TimeService) {
  }

  ngOnInit() {
    sessionStorage.setItem('registrationId', this.registrationId.toString());
    let d = new Date(Date.now());
  }

  projectName = ['ABC kidgarden construction', 'Sunshine primary school construction'];
  timeRegistration = new TimeRegistration(0, this.userId, '', '', null, null);

  addRegistration(timeRegistration: TimeRegistration): void {
   
    this.userData = JSON.parse(localStorage.getItem('user'));
    if (this.userData.userName == 'undefined' || this.userData.userName == null) {
      alert('Please log in!');
      this.router.navigate(['login']);
    }
    else {
      let todayLeftTime = 24 * 3600 * 1000 - Date.now() % (24 * 3600 * 1000);//milliseconds left today
      let differenceNowCalendar = new Date(this.timeRegistration.registrationTime).getTime() - Date.now();
      let ifIsFuture = differenceNowCalendar - todayLeftTime;//compare the calendar time to today
      if (this.timeRegistration.projectName != '' && this.timeRegistration.hours != null && this.timeRegistration.hours > 0 && this.timeRegistration.hours < 25 && ifIsFuture < 0) {
        this.timeService.addRegistration(this.timeRegistration).subscribe(() => {
          this.timeRegistration.projectName = '';
          this.timeRegistration.comment = '';
          this.timeRegistration.hours = null;
          this.timeRegistration.registrationTime = null;
          this.router.navigate['allTimesheets'];
        });
           if (location.href === 'https://localhost:44379/alltimesheets') {
           location.reload();
          }
        this.router.navigateByUrl('alltimesheets');
      }
      if (this.timeRegistration.projectName == '') {
        document.getElementById('projectError').innerHTML = 'Project name is required!';
      }
      if (this.timeRegistration.hours == null) {
        document.getElementById('durationError').innerHTML = 'Duration is required!';
      }
      if (this.timeRegistration.registrationTime == null) {
        document.getElementById('dateError').innerHTML = 'Date is required!';
      }
      //check if it is a future time
      if (ifIsFuture >= 0) {
        document.getElementById('dateError').innerHTML = 'You can  not input a furture time';
      }
    }
  }
  projectErrorMessage(event: any) {
    let elp = document.getElementById('projectError');
    if (event.target.value == '') {
      elp.innerHTML = 'Project name is required!';
    }
    else {
      elp.innerHTML = '';
    }
  }


  durationErrorMessage(event: any) {
    let eld = document.getElementById('durationError');
    let v = event.target.value;
    if (v == '') {
      eld.innerHTML = 'Duration is required!';
    }
    else if (v < 0 || v > 24) {
      eld.innerHTML = 'Please enter a number between -1 and 25!';
    }
    else {
      eld.innerHTML = '';
    }
  }

  dateErrorMessage(event: any) {
    let elda = document.getElementById('dateError');
    let v = event.target.value;
    if (v == '') {
      elda.innerHTML = 'Date is required!';
    }
    else {
      elda.innerHTML = '';
    }
  }

 
}


