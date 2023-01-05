import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../components/components.module';

import { GettingStartedPage } from './getting-started.page';
import { FileUploadModule } from 'ng2-file-upload';
import {UserService} from '../user/user.service';

const routes: Routes = [
  {
    path: '',
    component: GettingStartedPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    FileUploadModule
  ],
  declarations: [GettingStartedPage],
  providers: [UserService]
})
export class GettingStartedPageModule {}
