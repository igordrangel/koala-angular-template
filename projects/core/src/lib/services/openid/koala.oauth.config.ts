import { BehaviorSubject } from "rxjs";
import { KoalaOauth2ConfigInterface } from "./koala-oauth2-config.interface";
import { KoalaEnvironment } from "../../environments/koalaEnvironment";

// @dynamic
export class KoalaOauthConfig {
  public static config = new BehaviorSubject<KoalaOauth2ConfigInterface>(
    KoalaOauthConfig.getOAuthConfig(KoalaOauthConfig.getConfig())
  );

  public static getConfig() {
    return localStorage.getItem(KoalaEnvironment.environment?.storageOAuthTypeName);
  }

  public static hasConfig() {
    return !!this.getConfig();
  }

  public static setConfig(type: string) {
    localStorage.setItem(KoalaEnvironment.environment?.storageOAuthTypeName, type);
    this.config.next(this.getOAuthConfig(type));
  }

  private static getOAuthConfig(type?: string) {
    const environment = KoalaEnvironment.environment?.oauthConfig?.find(config => config.name === type) ?? null;

    return environment ?? {
      customQueryParams: {
        client_secret: null
      },
      clientId: null,
      scope: null,
      domain: null,
      strictDiscoveryDocumentValidation: false,
      indexLoginName: 'name'
    };
  }
}
