export interface KoalaOauth2ConfigInterface {
  clientId: string;
  scope: string;
  domain: string;
  indexLoginName: string;
  customQueryParams?: object;
  strictDiscoveryDocumentValidation?: boolean;
}
