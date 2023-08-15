import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

export const UserIdGuard: CanActivateFn = (route, state) => {
    console.log("user guard")
    const router = inject(Router)
    return inject(UserService).getUser(3).pipe(
        map((user) => {
            if (user.id) {
                console.log("user found")
                console.log(state)
                router.navigate(['account', 'home', `${user.id}`]);
                return false;
            } else {
                console.log("not found")
                return true
            }
        }),
    )
};

// router.parseUrl('/home/login');