import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrimePage } from './frime.page';

describe('FrimePage', () => {
  let component: FrimePage;
  let fixture: ComponentFixture<FrimePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrimePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrimePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
