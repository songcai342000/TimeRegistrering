import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlltimesheetsComponent } from './alltimesheets.component';

describe('AlltimesheetsComponent', () => {
  let component: AlltimesheetsComponent;
  let fixture: ComponentFixture<AlltimesheetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlltimesheetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlltimesheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
