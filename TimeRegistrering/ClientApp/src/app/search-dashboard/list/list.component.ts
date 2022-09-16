import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TimeRegistration } from '../../timeRegistration';
import { SearchCondition } from '../../searchCondition';
import { TimeService } from '../../services/time.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  registrations: TimeRegistration[];
  constructor(private router: Router, private timeService: TimeService) { }

  ngOnInit() {
   
  }

    ongetProjects(conditions: string) {
  
   
    if (conditions == '/null' || conditions === null || conditions == '') {
      this.timeService.getRegistrationList().subscribe(
        list => this.registrations = list
      );
    }
    else {
      this.registrations = null; //clear the list
      let s = conditions.split('/');
      if ((s[0] == 'undefined' || s[0] == '') && s[1] != 'undefined') {
        this.timeService.getRegistrationsByDate(s[1]).subscribe(
          list => this.registrations = list
        );
      }
      else if ((s[0] == 'undefined' || s[0] == '') && s[1] == 'undefined') {
        this.timeService.getRegistrationList().subscribe(
          list => this.registrations = list
        )
      }
      else if (s[1] == 'undefined' && s[0] != 'undefined' && s[0] != '') {
        this.timeService.getRegistrationsByProject(s[0]).subscribe(list => this.registrations = list);
      }

      else if (s[1] == 'null' && s[0] != 'undefined' && s[0] != '') {
        this.timeService.getRegistrationsByProject(s[0]).subscribe(
          list => this.registrations = list
        )
      }
      else if ((s[1] != 'undefined' && s[1] != 'null') && (s[0] != 'undefined' && s[0] != '')) {
        this.timeService.getRegistrationsByProjectAndDate(s[0], s[1]).subscribe(
            list => this.registrations = list
        )
      }

      let notice = document.getElementById('notice');
      notice.style.visibility = 'visible';
      notice.style.height = 'auto';
      notice.style.marginBottom = '3em';
    }
   
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
