import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountHomeComponent } from './pages/account-home/account-home.component';
import { UserIdGuard } from './guards/user-id-guard';

export const routes: Routes = [
  {
    data: { parents: ['account'] },
    children: [
      { path: '', redirectTo: 'home/login', pathMatch: 'full' },
      { path: 'home', redirectTo: 'home/login', pathMatch: 'full' },
      { path: 'home/login', canActivate: [UserIdGuard], component: AccountHomeComponent },
      { path: 'home/:userId',  component: AccountHomeComponent, data: { label: 'Home' } },
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes[0].children as Routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
