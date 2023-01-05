import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from "../components/components.module";

import { NewnotificationComponent } from '../components/newnotification/newnotification.component';
import { NotipopupPage } from "../notipopup/notipopup.page";

import { FrimePage } from './frime.page';
import { FrimeFullPage } from '../popover/frime-full/frime-full.page';

const routes: Routes = [
  {
    path: '',
    component: FrimePage,
    // data: { reuse: true }
  }
];

@NgModule({
  entryComponents: [NewnotificationComponent, NotipopupPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [FrimePage, NewnotificationComponent, NotipopupPage]
})
export class FrimePageModule {

  
}
