import { KoalaNotFoundError } from "./koala.not-found.error";
import { KoalaUnhautorizedError } from "./koala.unhautorized.error";
import { KoalaClientError } from "./koala.client.error";
import { KoalaSuccessError } from "./koala.success.error";
import { HttpErrorResponse } from "@angular/common/http";
import { koala } from "@koalarx/utils";
import { KoalaAlertEnum } from "../../../../../alert/koala.alert.enum";

export interface KoalaResponseInterface {
  error: boolean;
  alertEnum: KoalaAlertEnum;
  statusCode?: number;
  urlRequest?: string;
  message: string;
  data?: any;
}

export class KoalaErrorsHelper {
  public static generate(e: Error | HttpErrorResponse, urlRequest?: string, customMessage?: string): KoalaResponseInterface {

    let errorMessage = {
      error: true,
      message: (customMessage ? customMessage : e.message),
      urlRequest
    } as KoalaResponseInterface;

    if (e instanceof KoalaSuccessError) {
      errorMessage.error = false;
      errorMessage.statusCode = 200;
      errorMessage.alertEnum = KoalaAlertEnum.success;
    } else if (e instanceof KoalaNotFoundError) {
      errorMessage.statusCode = 404;
      errorMessage.alertEnum = KoalaAlertEnum.notFound;
    } else if (e instanceof KoalaUnhautorizedError) {
      errorMessage.statusCode = 401;
      errorMessage.alertEnum = KoalaAlertEnum.unhautorized;
    } else if (e instanceof KoalaClientError) {
      errorMessage.statusCode = 400;
      errorMessage.alertEnum = KoalaAlertEnum.badRequest;
    } else if (e instanceof HttpErrorResponse) {
      errorMessage.urlRequest = e.url;
      errorMessage.statusCode = e.status;
      errorMessage.alertEnum = KoalaAlertEnum.internalServerError;
      if (e.error && e.error.message) {
        errorMessage.message = e.error.message;
      }
    } else {
      errorMessage.statusCode = 500;
      errorMessage.alertEnum = KoalaAlertEnum.internalServerError;
    }

    return errorMessage;
  }
}
