import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FrimeRequestPage } from './frime-request.page';

describe('FrimeRequestPage', () => {
  let component: FrimeRequestPage;
  let fixture: ComponentFixture<FrimeRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrimeRequestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FrimeRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
