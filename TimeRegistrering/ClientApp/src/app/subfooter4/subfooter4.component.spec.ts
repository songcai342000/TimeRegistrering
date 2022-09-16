import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Subfooter4Component } from './subfooter4.component';

describe('Subfooter4Component', () => {
  let component: Subfooter4Component;
  let fixture: ComponentFixture<Subfooter4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Subfooter4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Subfooter4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
