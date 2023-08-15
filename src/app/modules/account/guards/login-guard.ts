import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

export const LoginGuard: CanActivateFn = (route, state) => {
    const router = inject(Router)
    return inject(UserService).user$.pipe(
        map((user) => {
            if (user) {
                router.navigate(['account', 'home', `${user.id}`]);
                return false;
            } else {
                return true
            }
        }),
    )
};