import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FrimeCancelPage } from './frime-cancel.page';

describe('FrimeCancelPage', () => {
  let component: FrimeCancelPage;
  let fixture: ComponentFixture<FrimeCancelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrimeCancelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FrimeCancelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
