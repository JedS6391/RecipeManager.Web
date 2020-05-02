// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  auth0Domain: 'dev-recipemanager.au.auth0.com',
  auth0ClientId: 'RcS9g50SmWCktkcfAag0gfOF4iJXKB3i',
  auth0Audience: 'https://jedsimson.co.nz/RecipeManager',
  sentryDsn: 'https://c90c4646da81439cb1996c844e9d6dd7@o386903.ingest.sentry.io/5221669',
  baseUrl: 'https://localhost:5001'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
