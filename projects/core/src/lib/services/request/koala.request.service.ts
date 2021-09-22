import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { KoalaAlertEnum, KoalaAlertService, KoalaRequestCodeToAlertEnumTranslate } from '@koalarx/ui/alert';
import { KoalaLanguageHelper } from "../../page/koala-language.helper";

@Injectable({providedIn: "any"})
export class KoalaRequestService {

  constructor(private koalaAlertService: KoalaAlertService) {
  }

  public request<T>(
    request: Promise<T> | Observable<T>,
    success?: (response: T) => void,
    error?: (error: T) => void
  ) {
    if (request instanceof Promise) {
      request.then((response) => {
        if (success) {
          success(response);
        }
      }).catch(e => {
        if (error) {
          error(e);
        }
        this.showAlertError(e);
      });
    } else {
      return request.subscribe(
        (response) => {
          if (success) {
            success(response);
          }
        },
        (e) => {
          if (error) {
            error(e);
          }
          this.showAlertError(e);
        }
      );
    }
  }

  private showAlertError(e: any) {
    const alertEnum = KoalaRequestCodeToAlertEnumTranslate.translate(e.statusCode);
    this.koalaAlertService.create({
      alertEnum,
      message: alertEnum === KoalaAlertEnum.internalServerError
               ? KoalaLanguageHelper.getInternalServerErrorMessage()
               : e.message
    });
  }
}
