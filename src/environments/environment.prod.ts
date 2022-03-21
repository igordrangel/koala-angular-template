import { KoalaEnvironmentInterface } from "../../projects/core/src/lib/environments/koalaEnvironment";

export const environment: KoalaEnvironmentInterface = {
  production: true,
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
