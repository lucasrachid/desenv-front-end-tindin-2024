import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthenticationService,
        private router: Router
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        return this.authService.isAuthenticated.pipe(
            take(1),
            map(isAuthenticated => {
                if (!isAuthenticated) {
                    this.router.navigate(['/login']);
                    return false;
                }
                return true;
            })
        );
    }
}
