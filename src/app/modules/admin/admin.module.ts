import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AdminUsersComponent } from './pages/admin-users/admin-users.component';
import { UserListComponent } from './components/ui/user-list/user-list.component';
import { UsersComponent } from './components/feature/users/users.component';

import { NavigationService } from 'src/shared-components/services/navigation.service';
import { routes } from './admin-routing.module';

@NgModule({
  declarations: [
    AdminHomeComponent,
    UserListComponent,
    UsersComponent,
    AdminUsersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule {
  constructor(private navigationService: NavigationService) {
    console.log("admin load")
    this.navigationService.addNavigationItems(routes);
  }
}
