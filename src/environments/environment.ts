// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { KoalaEnvironmentInterface } from "@koalarx/ui/core";

export const environment: KoalaEnvironmentInterface = {
  production: false,
  oauthConfig: [{
    name: 'google',
    customQueryParams: {
      client_secret: 't1gbmEgh4EUgAJRLy16Zjrks'
    },
    clientId: '679440572859-iviegii370t3n4m15qrpr4fpj4db8jc7.apps.googleusercontent.com',
    scope: 'openid profile email',
    domain: 'https://accounts.google.com',
    strictDiscoveryDocumentValidation: false,
    indexLoginName: 'name'
  }]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
