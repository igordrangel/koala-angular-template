import { KoalaAlertEnum } from './koala.alert.enum';

export class KoalaRequestCodeToAlertEnumTranslate {

  public static translate(statusCode: number): KoalaAlertEnum {
    switch (statusCode) {
      case 405:
        return KoalaAlertEnum.badRequest;
      case 404:
        return KoalaAlertEnum.notFound;
      case 401:
        return KoalaAlertEnum.unhautorized;
      default:
        return KoalaAlertEnum.internalServerError;
    }
  }
}
