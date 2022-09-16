import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreinforComponent } from './moreinfor.component';

describe('MoreinforComponent', () => {
  let component: MoreinforComponent;
  let fixture: ComponentFixture<MoreinforComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreinforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
