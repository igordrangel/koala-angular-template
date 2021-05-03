import { koalaEnvironment } from "../../../environments/koala.environment";

export class TokenFactory {
  private static token?: string;

  public static init() {
    if (!!localStorage.getItem(koalaEnvironment.storageTokenName)) {
      TokenFactory.setToken(localStorage.getItem(koalaEnvironment.storageTokenName));
    }
  }

  public static setToken(token: string) {
    localStorage.setItem(koalaEnvironment.storageTokenName, token);
    this.token = token;
  }

  public static getToken() {
    return this.token;
  }

  public static removeToken() {
    localStorage.removeItem(koalaEnvironment.storageTokenName);
    this.token = null;
  }

  public static hasToken() {
    return !!this.token && !!localStorage.getItem(koalaEnvironment.storageTokenName);
  }

  public static logout() {
    this.removeToken();
  }
}
