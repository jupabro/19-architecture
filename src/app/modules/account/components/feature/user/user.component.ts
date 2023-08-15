import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { User } from 'src/app/core/models/user.class';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  loggedInUser: User | undefined;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const userId = params.get('userId');
      if (userId && userId !== 'login') {
        const numericUserId = parseInt(userId, 10);
        this.userService.getUser(numericUserId).subscribe((user: User) => {
          this.loggedInUser = user;
        });
      }
    });
  }

  fetchUser(id: number) {
    console.log("fetching", id)

    this.router.navigate(['/account/home', id]);
    
  }
}
