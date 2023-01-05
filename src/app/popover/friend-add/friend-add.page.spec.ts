import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FriendAddPage } from './friend-add.page';

describe('FriendAddPage', () => {
  let component: FriendAddPage;
  let fixture: ComponentFixture<FriendAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FriendAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
