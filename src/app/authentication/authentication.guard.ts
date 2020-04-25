import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Observable, zip } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { TokenStoreService } from './token-store.service';

/**
 * Responsible for ensuring that the user is authenticated and the access token
 * is set before trying to access any authenticated routes.
 */
@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(
        private authenticationService: AuthenticationService,
        private tokenStoreService: TokenStoreService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return zip(
            this.authenticationService.isAuthenticated$.pipe(
                map(isAuthenticated => {
                    // Not authenticated implies no token is set, so catch this separately to
                    // provide a smooth redirect to the login process.
                    if (!isAuthenticated) {

                      this.authenticationService.login(state.url);

                      return false;
                    }

                    return true;
                })
            ),
            this.authenticationService.token$
        ).pipe(
            // We need to ensure that the token is set as well as being authenticated.
            // This is because no API calls can be made until the token is set.
            filter(([isAuthenticated, token]) => isAuthenticated && token !== null && token !== undefined),
            map(([_, token]) => {
              // Store the token for usage in other modules.
              this.tokenStoreService.token = token;

              return true;
            })
        );
    }
}
