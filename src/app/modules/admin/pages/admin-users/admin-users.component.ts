import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user.class';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  constructor(private userService: UserService) { }

  users: User[] = []

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => this.users = users)
  }
}
