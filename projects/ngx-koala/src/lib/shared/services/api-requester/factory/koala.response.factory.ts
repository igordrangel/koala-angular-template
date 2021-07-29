import { HttpResponse } from '@angular/common/http';
import { KoalaErrorsHelper, KoalaResponseInterface } from "../helpers/error/koala.errors.helper";
import { KoalaNotFoundError } from "../helpers/error/koala.not-found.error";
import { KoalaClientError } from "../helpers/error/koala.client.error";
import { KoalaUnhautorizedError } from "../helpers/error/koala.unhautorized.error";
import { KoalaSuccessError } from "../helpers/error/koala.success.error";
import { KoalaLanguageHelper } from "../../../helpers/koala-language.helper";

// @dynamic
export class KoalaResponseFactory {

  public static async generateResponse(response: HttpResponse<any>, urlRequest?: string): Promise<KoalaResponseInterface> {
    return new Promise<KoalaResponseInterface>((resolve, reject) => {
      let alert: KoalaResponseInterface;
      switch (response.status) {
        case 200:
        case 201:
          alert = KoalaErrorsHelper.generate(new KoalaSuccessError(response.body?.message), urlRequest);
          alert.data = response.body;
          resolve(alert);
          break;
        case 400:
          alert = KoalaErrorsHelper.generate(new KoalaClientError(response.body.message), urlRequest);
          reject(alert);
          break;
        case 404:
          alert = KoalaErrorsHelper.generate(new KoalaNotFoundError(response.body?.message), urlRequest);
          reject(alert);
          break;
        case 401:
          alert = KoalaErrorsHelper.generate(new KoalaUnhautorizedError(response.body?.message), urlRequest);
          reject(alert);
          break;
        case 405:
          alert = KoalaErrorsHelper.generate(new KoalaClientError(response.body?.message), urlRequest);
          reject(alert);
          break;
        case 500:
        default:
          alert = KoalaErrorsHelper.generate(new Error((response && response.body?.message) ? response.body?.message : KoalaLanguageHelper.getInternalServerErrorMessage()), urlRequest);
          reject(alert);
          break;
      }
    });
  }
}
