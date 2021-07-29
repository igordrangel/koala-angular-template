import { KoalaOauth2ConfigInterface } from "../shared/components/page/koala-oauth2-config.interface";

export interface KoalaEnvironmentOAuthInterface extends KoalaOauth2ConfigInterface {
  name: string;
}

export interface KoalaEnvironmentInterface {
  production: boolean;
  storageTokenName?: string;
  storageOAuthTypeName?: string;
  endpointApi?: string;
  authenticator?: string;
  oauthConfig?: KoalaEnvironmentOAuthInterface[];
}

// @dynamic
export class KoalaEnvironment {
  public static environment: KoalaEnvironmentInterface;
}
