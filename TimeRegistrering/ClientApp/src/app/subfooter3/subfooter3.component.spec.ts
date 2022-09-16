import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Subfooter3Component } from './subfooter3.component';

describe('Subfooter1Component', () => {
  let component: Subfooter3Component;
  let fixture: ComponentFixture<Subfooter3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Subfooter3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Subfooter3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
