import { ApiInterface } from '../../interfaces/service/api.interface';
import { ApiEnum } from '../../enum/api.enum';

export class ApiHelper {
  public static getApi(apiEnum?: number): ApiInterface {
    return this.getApiByEnum(apiEnum);
  }

  private static getApiByEnum(apiEnum?: ApiEnum): ApiInterface {
    switch (apiEnum) {
      case ApiEnum.prod:
        return {
          enum: apiEnum,
          url: 'http://localhost:3000',
        } as ApiInterface;
      default:
        return {
          enum: apiEnum,
          url: 'http://localhost:3000',
        } as ApiInterface;
    }
  }
}
