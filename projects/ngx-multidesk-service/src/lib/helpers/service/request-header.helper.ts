import { KoalaObjectHelper } from 'tskoala-helpers/dist/object/koala-object.helper';
import { TokenHelper } from '../token/token.helper';

export class RequestHeaderHelper {
  public static add() {
    const headers = {};
    if (TokenHelper.hasToken()) {
      KoalaObjectHelper.merge(headers, {
        Authorization: 'Bearer ' + TokenHelper.getToken(),
      });
    }

    return headers;
  }
}
