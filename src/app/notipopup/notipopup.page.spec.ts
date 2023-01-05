import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotipopupPage } from './notipopup.page';

describe('NotipopupPage', () => {
  let component: NotipopupPage;
  let fixture: ComponentFixture<NotipopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotipopupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotipopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
