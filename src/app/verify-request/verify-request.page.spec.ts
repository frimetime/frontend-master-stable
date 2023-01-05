import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyRequestPage } from './verify-request.page';

describe('VerifyRequestPage', () => {
  let component: VerifyRequestPage;
  let fixture: ComponentFixture<VerifyRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyRequestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
