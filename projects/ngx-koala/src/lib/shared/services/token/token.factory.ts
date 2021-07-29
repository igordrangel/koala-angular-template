import { KoalaEnvironment } from "../../../environments/koalaEnvironment";

// @dynamic
export class TokenFactory {
  private static token?: string;

  public static init() {
    if (!!localStorage.getItem(KoalaEnvironment.environment?.storageTokenName)) {
      TokenFactory.setToken(localStorage.getItem(KoalaEnvironment.environment?.storageTokenName));
    }
  }

  public static setToken(token: string) {
    localStorage.setItem(KoalaEnvironment.environment?.storageTokenName, token);
    this.token = token;
  }

  public static getToken() {
    return this.token;
  }

  public static removeToken() {
    localStorage.removeItem(KoalaEnvironment.environment?.storageTokenName);
    this.token = null;
  }

  public static hasToken() {
    return !!this.token && !!localStorage.getItem(KoalaEnvironment.environment?.storageTokenName);
  }

  public static logout() {
    this.removeToken();
  }
}
