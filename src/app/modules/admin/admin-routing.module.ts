import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AdminUsersComponent } from './pages/admin-users/admin-users.component';

export const routes: Routes = [
  {
    data: { parents: ['admin'] },
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: AdminHomeComponent, data: { label: 'Home' } },
      { path: 'users', component: AdminUsersComponent, data: { label: 'Users' } },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes[0].children as Routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
