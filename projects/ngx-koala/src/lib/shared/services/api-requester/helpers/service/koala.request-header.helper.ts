import { koala } from 'koala-utils';
import { HttpHeaders } from "@angular/common/http";
import { KoalaEnvironment } from "../../../../../environments/koalaEnvironment";

export class KoalaRequestHeaderHelper {

  public static add(token?: string) {
    const headers = koala({}).object();

    if (token) { headers.merge({Authorization: 'Bearer ' + token}); }
    if (KoalaEnvironment.environment?.authenticator) { headers.merge({Authenticator: KoalaEnvironment.environment?.authenticator}); }

    return headers.getValue() as HttpHeaders;
  }
}
