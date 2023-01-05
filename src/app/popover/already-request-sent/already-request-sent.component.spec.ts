import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlreadyRequestSentComponent } from './already-request-sent.component';

describe('AlreadyRequestSentComponent', () => {
  let component: AlreadyRequestSentComponent;
  let fixture: ComponentFixture<AlreadyRequestSentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlreadyRequestSentComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlreadyRequestSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
