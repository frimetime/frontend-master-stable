import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FriendDetailPage } from './friend-detail.page';

describe('FriendDetailPage', () => {
  let component: FriendDetailPage;
  let fixture: ComponentFixture<FriendDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FriendDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
