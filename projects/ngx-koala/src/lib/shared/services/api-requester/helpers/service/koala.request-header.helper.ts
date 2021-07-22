import { koala } from 'koala-utils';
import { HttpHeaders } from "@angular/common/http";

export class KoalaRequestHeaderHelper {

  public static add(token?: string, authenticator?: string) {
    const headers = koala({}).object();

    if (token) { headers.merge({Authorization: 'Bearer ' + token}); }
    if (authenticator) { headers.merge({Authenticator: authenticator}); }

    return headers.getValue() as HttpHeaders;
  }
}
