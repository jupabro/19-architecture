import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.class';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  loggedInUser$: Observable<User | null> | undefined

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.loggedInUser$ = this.userService.user$
    // this.route.paramMap.subscribe((params: ParamMap) => {
    //   const userId = params.get('userId');
    //   if (userId && userId !== 'login') {
    //     this.userService.user$.subscribe((user) => {
    //       this.loggedInUser = user;
    //     });
    //   }
    // });
  }

  fetchUser(id: number) {
    console.log("fetching", id)
    this.userService.login(id).subscribe((boolean) => { if (boolean) { this.router.navigate(['/account/home', id]) } })
  }
}
