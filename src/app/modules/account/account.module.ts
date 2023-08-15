import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AccountRoutingModule } from './account-routing.module';
import { AccountHomeComponent } from './pages/account-home/account-home.component';
import { NavigationService } from 'src/shared-components/services/navigation.service';
import { routes } from './account-routing.module';
import { UserDetailsComponent } from './components/ui/user-details/user-details.component';
import { UserComponent } from './components/feature/user/user.component';
import { LoginFormComponent } from './components/ui/login-form/login-form.component';


@NgModule({
  declarations: [
    AccountHomeComponent,
    UserDetailsComponent,
    UserComponent,
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule
  ]
})
export class AccountModule {
  constructor(private navigationService: NavigationService) {
    console.log("account load")
    this.navigationService.addNavigationItems(routes);
  }
}
