import { KoalaNotFoundError } from "./koala.not-found.error";
import { KoalaUnhautorizedError } from "./koala.unhautorized.error";
import { KoalaClientError } from "./koala.client.error";
import { KoalaSuccessError } from "./koala.success.error";
import { HttpErrorResponse } from "@angular/common/http";
import { koala } from "koala-utils";

export interface KoalaResponseInterface {
  error: boolean;
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
    } else if (e instanceof KoalaNotFoundError) {
      errorMessage.statusCode = 404;
    } else if (e instanceof KoalaUnhautorizedError) {
      errorMessage.statusCode = 401;
    } else if (e instanceof KoalaClientError) {
      errorMessage.statusCode = 400;
    } else if (e instanceof HttpErrorResponse) {
      errorMessage.urlRequest = e.url;
      errorMessage.statusCode = e.status;
      if (e.error && e.error.message) {
        if (typeof e.error.message === 'string') {
          errorMessage.message = e.error.message;
        } else {
          errorMessage.message = `<ul>${koala(e.error.message)
            .array<string>()
            .map(item => `<li>${item}</li>`)
            .toString('')
            .getValue()}</ul>`;
        }
      }
    } else {
      errorMessage.statusCode = 500;
    }

    return errorMessage;
  }
}
