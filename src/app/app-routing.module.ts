import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { config } from 'rxjs';
// import Auth = firebase.auth.Auth;

const routes: Routes = [
  // tslint:disable-next-line:max-line-length
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'getting-started',
    canActivate: [AuthGuard],
    loadChildren: () => import('./getting-started/getting-started.module').then(m => m.GettingStartedPageModule)
  },
  { path: 'auth/login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) }, // canActivate: [LoginGuard],
  { path: 'auth/signup', loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule) },
  { path: 'auth/policy', loadChildren: () => import('./policy/policy.module').then(m => m.PolicyPageModule) },
  { path: 'auth/terms', loadChildren: () => import('./terms/terms.module').then(m => m.TermsPageModule) },
  {
    path: 'pending',
    loadChildren: () => import('./pending/pending.module').then(m => m.PendingPageModule)
  },
  // tslint:disable-next-line:max-line-length
  { path: 'auth/forgot-password', loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule) },
  // tslint:disable-next-line:max-line-length
  {
    path: 'app',
    canActivate: [AuthGuard],
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule)
  },
  { path: 'contact', loadChildren: () => import('./contact/contact.module').then(m => m.ContactPageModule) },
  { path: 'impressum', loadChildren: () => import('./impressum/impressum.module').then(m => m.ImpressumPageModule) },
  // tslint:disable-next-line:max-line-length
  {
    path: 'chat',
    canActivate: [AuthGuard],
    loadChildren: () => import('./chat/chat.module').then(m => m.ChatPageModule)
  },
  { path: 'page-not-found', loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundModule) },
  { path: '**', redirectTo: 'page-not-found' },
  {
    path: 'frimelist',
    canActivate: [AuthGuard],
    loadChildren: () => import('./frimelist/frimelist.module').then(m => m.FrimelistPageModule),
    runGuardsAndResolvers: 'always',
    data: { reuse: false }
  },
  {
    path: 'frime',
    canActivate: [AuthGuard],
    loadChildren: () => import('./frime/frime.module').then(m => m.FrimePageModule)
  }, // canActivate: [AuthGuard]
  {
    path: 'frime/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./frime/frime.module').then(m => m.FrimePageModule)
  },
  {
    path: 'groups',
    canActivate: [AuthGuard],
    loadChildren: () => import('./groups/groups.module').then(m => m.GroupsPageModule),
    runGuardsAndResolvers: 'always',
    data: { reuse: false }
  },
  { path: 'modal', loadChildren: () => import('./modal/modal.module').then(m => m.ModalPageModule) },
  { path: 'popover', loadChildren: () => import('./popover/popover.module').then(m => m.PopoverPageModule) },
  { path: 'popover2', loadChildren: () => import('./popover/popover.module').then(m => m.PopoverPageModule) },
  { path: 'verify-request', loadChildren: () => import('./verify-request/verify-request.module').then(m => m.VerifyRequestPageModule) },
  { path: 'edit-profile', loadChildren: () => import('./user/edit-profile/edit-profile.module').then(m => m.EditProfilePageModule) },
  { path: 'frime-cancel', loadChildren: () => import('./popover/frime-cancel/frime-cancel.module').then(m => m.FrimeCancelPageModule) },
  { path: 'frime-request', loadChildren: () => import('./popover/frime-request/frime-request.module').then(m => m.FrimeRequestPageModule) },
  { path: 'frime-request-sent', loadChildren: () => import('./popover/frime-request-sent/frime-request-sent.module').then(m => m.FrimeRequestSentPageModule) },
  { path: 'frime-leave', loadChildren: () => import('./popover/frime-leave/frime-leave.module').then(m => m.FrimeLeavePageModule) },
  { path: 'friend-add', loadChildren: () => import('./popover/friend-add/friend-add.module').then(m => m.FriendAddPageModule) },
  { path: 'friend-delete', loadChildren: () => import('./popover/friend-delete/friend-delete.module').then(m => m.FriendDeletePageModule) },
  { path: 'already-request-sent', loadChildren: () => import('./popover/already-request-sent/already-request-sent.module').then(m => m.AlreadyRequestSentPageModule) },

];
@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: "reload" })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
