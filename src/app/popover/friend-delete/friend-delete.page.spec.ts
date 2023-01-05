import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FriendDeletePage } from './friend-delete.page';

describe('FriendDeletePage', () => {
  let component: FriendDeletePage;
  let fixture: ComponentFixture<FriendDeletePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendDeletePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FriendDeletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
