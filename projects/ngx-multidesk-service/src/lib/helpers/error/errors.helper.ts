import { NotFoundError } from './not-found.error';
import { ResponseInterface } from '../../interfaces/service/response.interface';
import { UnhautorizedError } from './unhautorized.error';
import { ClientError } from './client.error';
import { SuccessError } from './success.error';
import { HttpErrorResponse } from '@angular/common/http';
import { MultideskResponseInterface } from '../../interfaces/service/multidesk-response.interface';

export class ErrorsHelper {
  public static generate(
    e: Error | HttpErrorResponse,
    urlRequest?: string,
    customMessage?: string,
    response?: MultideskResponseInterface,
  ): ResponseInterface {
    const errorMessage = {
      error: true,
      message: customMessage ? customMessage : e.message,
      urlRequest,
    } as ResponseInterface;

    if (e instanceof SuccessError) {
      errorMessage.error = false;
      errorMessage.statusCode = 200;
    } else if (e instanceof NotFoundError) {
      errorMessage.statusCode = 404;
    } else if (e instanceof UnhautorizedError) {
      errorMessage.statusCode = 401;
    } else if (e instanceof ClientError) {
      errorMessage.statusCode = 400;
    } else if (e instanceof HttpErrorResponse) {
      errorMessage.urlRequest = e.url ?? '';
      errorMessage.statusCode = e.status;
      if (e.error && e.error.message) {
        errorMessage.message = e.error.message;
      }
    } else {
      errorMessage.statusCode = 500;
    }

    if (response) {
      errorMessage.data = response.data;
    }

    return errorMessage;
  }
}
