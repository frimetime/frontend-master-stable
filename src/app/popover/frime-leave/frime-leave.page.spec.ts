import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FrimeLeavePage } from './frime-leave.page';

describe('FrimeLeavePage', () => {
  let component: FrimeLeavePage;
  let fixture: ComponentFixture<FrimeLeavePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrimeLeavePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FrimeLeavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
