import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { label: 'Home' } },
  { path: "account", loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule), data: { label: 'Account' } },
  { path: "admin", loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule), data: { label: 'Admin' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
