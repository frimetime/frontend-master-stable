import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FrimeFullPage } from './frime-full.page';

describe('FrimeFullPage', () => {
  let component: FrimeFullPage;
  let fixture: ComponentFixture<FrimeFullPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrimeFullPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FrimeFullPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
