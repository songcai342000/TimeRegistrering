import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-foot',
  templateUrl: './foot.component.html',
  styleUrls: ['./foot.component.css']
})
export class FootComponent implements OnInit {
  currentUrl: string;
  constructor() { }

  ngOnInit() {
  }

  back() {
    window.scrollTo(0, 0);
    this.currentUrl = document.referrer;
  }

}
