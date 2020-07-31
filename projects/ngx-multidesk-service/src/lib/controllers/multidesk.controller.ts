import { ApiEnum } from '../enum/api.enum';

export class MultideskController {
  private static localStorageName = 'multideskAppEnviroment';

  public static setEnviroment(environment: 'prod' | 'local') {
    localStorage.setItem(this.localStorageName, environment);
  }

  public static getEnviroment(): ApiEnum {
    return localStorage.getItem(this.localStorageName) === 'local' ? ApiEnum.local : ApiEnum.prod;
  }
}
