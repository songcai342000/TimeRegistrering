import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionHeader2Component } from './function-header2.component';

describe('FunctionHeader2Component', () => {
  let component: FunctionHeader2Component;
  let fixture: ComponentFixture<FunctionHeader2Component>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionHeader2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
