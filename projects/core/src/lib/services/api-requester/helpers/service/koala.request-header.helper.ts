import { koala } from "@koalarx/utils";
import { HttpHeaders } from "@angular/common/http";
import { KoalaOauthConfig } from "@koalarx/ui/core";

export class KoalaRequestHeaderHelper {

  public static add(token?: string) {
    const headers = koala({}).object();

    if (token) { headers.merge({Authorization: 'Bearer ' + token}); }
    if (KoalaOauthConfig.hasConfig()) { headers.merge({Authenticator: KoalaOauthConfig.getConfig()}); }

    return headers.getValue() as HttpHeaders;
  }
}
