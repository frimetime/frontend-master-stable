import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FrimeRequestSentPage } from './frime-request-sent.page';

describe('FrimeRequestSentPage', () => {
  let component: FrimeRequestSentPage;
  let fixture: ComponentFixture<FrimeRequestSentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrimeRequestSentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FrimeRequestSentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
