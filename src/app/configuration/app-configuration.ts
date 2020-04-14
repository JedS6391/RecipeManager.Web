import { InjectionToken, NgModule } from '@angular/core';

import { environment } from '../../environments/environment';

export let APP_CONFIGURATION = new InjectionToken<AppConfiguration>('app.config');

export class AppConfiguration {
    authentication: AuthenticationConfiguration;
}

export class AuthenticationConfiguration {
    auth0Domain: string;
    auth0ClientId: string;
    auth0Audience: string;
}

export const DEFAULT_APP_CONFIG: AppConfiguration = {
    authentication: {
        auth0Domain: environment.auth0Domain,
        auth0ClientId: environment.auth0ClientId,
        auth0Audience: environment.auth0Audience
    }
};

@NgModule({
    providers: [{
        provide: APP_CONFIGURATION,
        useValue: DEFAULT_APP_CONFIG
    }]
})
export class AppConfigurationModule { }
