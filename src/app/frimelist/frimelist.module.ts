import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../components/components.module';

import { FrimelistPage } from './frimelist.page';
import { NotificationsResolver } from '../notifications/notifications.resolver';
import { NotificationsService } from '../notifications/notifications.service';
import { FrimeRequestPage } from '../popover/frime-request/frime-request.page';
import { FrimeRequestSentPage } from '../popover/frime-request-sent/frime-request-sent.page';
import { FrimeCancelPage } from '../popover/frime-cancel/frime-cancel.page';
import { AlreadyRequestSentComponent } from '../popover/already-request-sent/already-request-sent.component';
import { FrimeFullPage } from '../popover/frime-full/frime-full.page';

const routes: Routes = [
  {
    path: '',
    component: FrimelistPage,
    data: { reuse: false }
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        component: FrimelistPage,
        resolve: {
          data: NotificationsResolver
        },
        runGuardsAndResolvers: 'always',
        data: { reuse: false }
      }
    ]),
    // RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  declarations: [FrimelistPage, FrimeFullPage],
  providers: [
    NotificationsResolver,
    NotificationsService
  ],
  entryComponents: [FrimeRequestPage, FrimeRequestSentPage, FrimeCancelPage, AlreadyRequestSentComponent, FrimeFullPage]
})
export class FrimelistPageModule { }
