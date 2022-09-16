import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SearchCondition } from '../../searchCondition';
import { TimeService } from '../../services/time.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() getProjects = new EventEmitter<string>();
//  userName: string = localStorage.getItem('userName');
  projectName: string;
  date: Date;
  condition: string;

  constructor(private router: Router, private timeService: TimeService) { }

  ngOnInit() {
  }

  sendCondition(conditionvalue: string): void {
   
    this.getProjects.emit(conditionvalue);
    this.projectName = '';
    this.date = null;
    this.condition = '/null';
  }

  getNameValue(event: any) {
    this.projectName = event.target.value;
    this.condition = this.projectName + '/' + this.date;
  }

  getDateValue(event: any) {
    this.date = event.target.value;
    this.condition = this.projectName + '/' + this.date;
  }

  getInputConditions(event: any) {
    this.condition = event.target.value;
  }
}


