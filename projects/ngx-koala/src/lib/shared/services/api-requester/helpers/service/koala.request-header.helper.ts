import { koala } from 'koala-utils';

export class KoalaRequestHeaderHelper {

  public static add(token?: string) {
    let headers = {};
    if (token) {
      koala(headers).object().merge({
        Authorization: 'Bearer ' + token
      });
    }

    return headers;
  }
}
