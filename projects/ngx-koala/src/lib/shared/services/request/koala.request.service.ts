import { Injectable } from '@angular/core';
import { KoalaRequestCodeToAlertEnumTranslate } from '../../components/alert/koala.request-code-to-alert-enum.translate';
import { KoalaAlertService } from '../alert/koala.alert.service';
import { KoalaAlertEnum } from '../../components/alert/koala.alert.enum';

@Injectable({providedIn: 'root'})
export class KoalaRequestService {

  constructor(private koalaAlertService: KoalaAlertService) {
  }

  public request<T>(
    request: Promise<T>,
    success: (response: T) => void,
    error: (error: T) => void
  ) {
    request.then((response) => {
      success(response);
    }).catch(e => {
      error(e);
      const alertEnum = KoalaRequestCodeToAlertEnumTranslate.translate(e.statusCode);
      this.koalaAlertService.create({
        alertEnum,
        message: alertEnum === KoalaAlertEnum.internalServerError ?
          'Ops, tivemos um problema com sua requisição.<br/>Sinto muito pelo transtorno.<br/>Gentileza tentar novamente mais tarde.' :
          e.message
      });
    });
  }
}
