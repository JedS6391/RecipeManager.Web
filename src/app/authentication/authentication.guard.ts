import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(private authenticationService: AuthenticationService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> {
        return this.authenticationService.isAuthenticated$.pipe(
            tap(isLoggedIn => {
                if (!isLoggedIn) {
                    this.authenticationService.login(state.url);
                }
            })
        );
    }
}
