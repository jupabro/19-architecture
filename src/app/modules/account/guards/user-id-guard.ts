import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

export const UserIdGuard: CanActivateFn = (route, state) => {
    console.log("user-id guard")
    const router = inject(Router)
    return inject(UserService).user$.pipe(
        map((user) => {
            if (user && user.id == route.params['userId']) {
                console.log("user-id guard: user id match")
                return true;
            } else {
                router.navigate(['account', 'home', 'login']);
                return false
            }
        }),
    )
};