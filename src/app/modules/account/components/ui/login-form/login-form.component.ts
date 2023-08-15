import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  @Output() loggedInUserId = new EventEmitter<number>();
  userId: number | null = null;

  onSubmit() {
    if (this.userId !== null) {
      console.log(this.userId)
      this.loggedInUserId.emit(this.userId);
    }
  }
}
