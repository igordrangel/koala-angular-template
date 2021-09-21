import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { KoalaRequestCodeToAlertEnumTranslate } from '../../../alert/koala.request-code-to-alert-enum.translate';
import { KoalaAlertService } from '../../../alert/koala.alert.service';
import { KoalaAlertEnum } from '../../../alert/koala.alert.enum';
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
