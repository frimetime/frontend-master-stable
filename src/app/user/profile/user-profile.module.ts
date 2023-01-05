import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserProfilePage } from './user-profile.page';
import { UserService } from '../user.service';
import { UserProfileResolver } from './user-profile.resolver';
import { ComponentsModule } from '../../components/components.module';
import { LanguageService } from '../../language/language.service';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationsResolver } from '../../notifications/notifications.resolver';
import { NotificationsService } from '../../notifications/notifications.service';
import {FileUploadModule} from 'ng2-file-upload';


const routes: Routes = [
  {
    path: '',
    component: UserProfilePage,
    resolve: {
      data: NotificationsResolver
    },
    // data: { reuse: false }
  }
];

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        TranslateModule,
        ComponentsModule,
        RouterModule.forChild(routes),
        FileUploadModule
    ],
  declarations: [UserProfilePage],
  providers: [
    UserProfileResolver,
    UserService,
    LanguageService,
    NotificationsResolver,
    NotificationsService
  ]
})
export class UserProfilePageModule {}
