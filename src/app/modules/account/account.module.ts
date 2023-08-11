import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountHomeComponent } from './pages/account-home/account-home.component';
import { NavigationService } from 'src/shared-components/services/navigation.service';
import { routes } from './account-routing.module';
import { UserDetailsComponent } from './components/ui/user-details/user-details.component';
import { UserComponent } from './components/feature/user/user.component';


@NgModule({
  declarations: [
    AccountHomeComponent,
    UserDetailsComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule
  ]
})
export class AccountModule {
  constructor(private navigationService: NavigationService) {
    console.log("account load")
    this.navigationService.addNavigationItems(routes);
  }
}
