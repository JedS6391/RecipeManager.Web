import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../authentication/authentication.service';
import { takeUntil } from 'rxjs/operators';

export class BaseApiService implements OnDestroy {
    protected token: string;
    private destroyed$ = new Subject();

    constructor(
        protected baseUrl: string,
        protected http: HttpClient,
        protected authenticationService: AuthenticationService
    ) {
        this.authenticationService.token$
            .pipe(takeUntil(this.destroyed$))
            .subscribe(token => this.token = token);
    }

    public ngOnDestroy() {
        this.destroyed$.next();
    }

    protected getHeaders(): HttpHeaders {
        return new HttpHeaders({
            Authorization: `Bearer ${this.token}`
        });
    }
}
