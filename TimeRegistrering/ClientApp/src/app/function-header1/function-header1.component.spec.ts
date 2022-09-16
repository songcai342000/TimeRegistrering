import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionHeader1Component } from './function-header1.component';

describe('FunctionHeader1Component', () => {
  let component: FunctionHeader1Component;
  let fixture: ComponentFixture<FunctionHeader1Component>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionHeader1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
