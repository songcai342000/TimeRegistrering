import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TimeService } from '../services/time.service';
import { TimeRegistration } from '../timeRegistration';

@Component({
  selector: 'app-alltimesheets',
  templateUrl: './alltimesheets.component.html',
  styleUrls: ['./alltimesheets.component.css']
})
 
export class AlltimesheetsComponent implements OnInit {
  allTimesheets: TimeRegistration[];
  result: string ='';

  constructor(private router: Router, private timeService: TimeService) { }
  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.timeService.getRegistrationList().subscribe(
      list => this.allTimesheets = list
    );
  }

  printvisible() {
    document.getElementById('printtooltip').style.visibility = 'visible';
  }

  printinvisible() {
    document.getElementById('printtooltip').style.visibility = 'hidden';
  }

  pdfvisible() {
    document.getElementById('pdftooltip').style.visibility = 'visible';
  }

  pdfinvisible() {
    document.getElementById('pdftooltip').style.visibility = 'hidden';
  }

}
