import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountHomeComponent } from './pages/account-home/account-home.component';
import { UserIdGuard } from './guards/user-id-guard';
import { LoginGuard } from './guards/login-guard';

export const routes: Routes = [
  {
    data: { parents: ['account'] },
    children: [
      { path: '', redirectTo: 'home/login', pathMatch: 'full' },
      { path: 'home', redirectTo: 'home/login', pathMatch: 'full' },
      { path: 'home/login', canActivate: [LoginGuard], component: AccountHomeComponent },
      { path: 'home/:userId', canActivate: [UserIdGuard], component: AccountHomeComponent, data: { label: 'Home' } },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes[0].children as Routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
