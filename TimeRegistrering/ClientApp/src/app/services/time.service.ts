import { Injectable, Inject } from '@angular/core';
import { TimeRegistration } from '../timeRegistration';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { SearchCondition } from '../searchCondition';
import { Router } from '@angular/router';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  myRegistrations: TimeRegistration[];
  searchCondition: SearchCondition;
  timeRegistration: TimeRegistration;
  token: string = localStorage.getItem('authToken');
  user: User;
  private registrationUrl = 'api/TimeRegistrations';
  private getSumUrl = 'api/TimeRegistrations/GetTimeSum';

  constructor(private http: HttpClient, private router: Router) { }

  getUser(userName: string) {
    return this.http.get<User>('api/User/GetUserId');
  }

  getRegistrationList(): Observable<TimeRegistration[]> {
    return this.http.get<TimeRegistration[]>(this.registrationUrl + '/GetTimeRegistrations');
  }

  /*newRegistration(timeRegistration: TimeRegistration) {
    let ls = localStorage.getItem('registrations');
    if (ls == '[]' || ls == null) {
      this.myRegistrations = [];
      timeRegistration.registrationId = 3;
      this.myRegistrations.push(timeRegistration);
    }
    else {
      this.myRegistrations = JSON.parse(ls);
      timeRegistration.registrationId = this.myRegistrations[this.myRegistrations.length - 1].registrationId + 1;
      this.myRegistrations.push(timeRegistration);
    }
    return localStorage.setItem('registrations', JSON.stringify(this.myRegistrations));
  }*/

  addRegistration(registration: TimeRegistration) {
    registration.userId = JSON.parse(localStorage.getItem('user')).userId;
    return this.http.post<TimeRegistration>('api/TimeRegistrations', registration);
  }

  cleanRegistrations() {

  }

  getRegistrationsByDate(date: string): Observable<TimeRegistration[]>{
    return this.http.get<TimeRegistration[]>('api/TimeRegistrations/GetTimeRegistrationsByDate/' + date);
  }

  getRegistrationsByProject(project: string): Observable<TimeRegistration[]> {
    return this.http.get<TimeRegistration[]>('api/TimeRegistrations/GetTimeRegistrationsByProject/' + project);
  }

  getRegistrationsByProjectAndDate(project: string, date: string): Observable<TimeRegistration[]> {
    return this.http.get<TimeRegistration[]>('api/TimeRegistrations/GetTimeRegistrationsByProjectAndDate/' + project + '/' + date);
  }

  //get hours sum
  getHourSum(): Observable<number> {
    return this.http.get<any>(this.getSumUrl);
  }

  //delete a registration from the database with http delete
   /* deleteRegistration(id: number) {
    this.myRegistrations = JSON.parse(localStorage.getItem('registrations'));
    for (let i = 0; i < this.myRegistrations.length; i++) {
      if (this.myRegistrations[i]['registrationId'] == id) {
        this.myRegistrations.splice(i, 1);
      }
    }
   return localStorage.setItem('registrations', JSON.stringify(this.myRegistrations));
  }*/

  deleteRegistration(id: number) {
    return this.http.delete<TimeRegistration>('api/TimeRegistrations/DeleteRegistration');
  }
}
