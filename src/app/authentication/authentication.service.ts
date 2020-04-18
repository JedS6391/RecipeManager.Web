import { Injectable, Inject, OnDestroy, OnInit } from '@angular/core';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { APP_CONFIGURATION, AppConfiguration } from '../configuration/app-configuration';
import { Observable, from, throwError, of, BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { shareReplay, catchError, concatMap, tap, takeUntil, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService implements OnDestroy {
    private auth0Client$: Observable<Auth0Client> = from(createAuth0Client({
        domain: this.appConfiguration.authentication.auth0Domain,
        client_id: this.appConfiguration.authentication.auth0ClientId,
        audience: this.appConfiguration.authentication.auth0Audience,
        redirect_uri: `${window.location.origin}`
    })).pipe(
        // Ensure the same value of the auth client is used across the app.
        shareReplay(1),
        catchError(err => throwError(err))
    );
    private userProfileSubject$ = new BehaviorSubject<any>(null);
    private destroyed$ = new Subject();

    constructor(
        @Inject(APP_CONFIGURATION) private appConfiguration: AppConfiguration,
        private router: Router
    ) {
        this.configureAuthentication();
        this.handleAuthenticationCallback();
    }

    public loggedIn: boolean;

    public isAuthenticated$ = this.auth0Client$.pipe(
        concatMap(client => from(client.isAuthenticated())),
        tap(isAuthenticated => this.loggedIn = isAuthenticated)
    );

    public token$ = this.auth0Client$.pipe(
        concatMap(client => from(client.getTokenSilently()))
    );

    public userProfile$ = this.userProfileSubject$.asObservable();

    public handleRedirectCallback$ = this.auth0Client$.pipe(
        concatMap(client => from(client.handleRedirectCallback()))
    );

    public getUser$(options?: GetUserOptions): Observable<any> {
        return this.auth0Client$.pipe(
          concatMap(client => from(client.getUser(options))),
          tap(user => this.userProfileSubject$.next(user))
        );
    }

    public login(redirectPath: string = '/') {
        // A desired redirect path can be passed to login method
        // (e.g., from a route guard)
        // Ensure Auth0 client instance exists
        this.auth0Client$.subscribe(client => {
            // Call method to log in
            client.loginWithRedirect({
                redirect_uri: `${window.location.origin}`,
                appState: { target: redirectPath }
            });
        });
      }

    public logout() {
        // Ensure Auth0 client instance exists
        this.auth0Client$.subscribe((client: Auth0Client) => {
        // Call method to log out
        client.logout({
          client_id: this.appConfiguration.authentication.auth0ClientId,
          returnTo: `${window.location.origin}`
        });
      });
    }

    private configureAuthentication() {
        // This should only be called on app initialization
        // Set up local authentication streams
        const checkAuth$ = this.isAuthenticated$.pipe(
            concatMap(isLoggedIn => {
                if (isLoggedIn) {
                    // If authenticated, get user and set in app
                    return this.getUser$();
                }

                // If not authenticated, return stream that emits 'false'
                return of(isLoggedIn);
            })
        );

        checkAuth$
            .pipe(takeUntil(this.destroyed$))
            .subscribe();
    }

    private handleAuthenticationCallback() {
        // Call when app reloads after user logs in with Auth0
        const params = window.location.search;

        if (params.includes('code=') && params.includes('state=')) {
            let targetRoute: string; // Path to redirect to after login processsed

            const authComplete$ = this.handleRedirectCallback$.pipe(
                // Have client, now call method to handle auth callback redirect
                tap(callbackResult => {
                    // Get and set target redirect route from callback results
                    targetRoute = callbackResult.appState && callbackResult.appState.target ?
                        callbackResult.appState.target :
                        '/';
                    }),
                    concatMap(() => {
                    // Redirect callback complete; get user and login status
                    return combineLatest([
                        this.getUser$(),
                        this.isAuthenticated$
                    ]);
                })
            );
            // Subscribe to authentication completion observable
            // Response will be an array of user and login status
            authComplete$
                .pipe(takeUntil(this.destroyed$))
                .subscribe(_ => {
                    // Redirect to target route after callback processing
                    this.router.navigate([targetRoute]);
                });
        }
    }

    public ngOnDestroy(): void {
        this.destroyed$.next();
    }
}
