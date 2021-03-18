export const KOALA_TOKEN_STORAGE_NAME = 'koalaStorageToken';

export class TokenFactory {
  private static token?: string;

  public static init() {
    if (!!localStorage.getItem(KOALA_TOKEN_STORAGE_NAME)) {
      TokenFactory.setToken(localStorage.getItem(KOALA_TOKEN_STORAGE_NAME));
    }
  }

  public static setToken(token: string) {
    localStorage.setItem(KOALA_TOKEN_STORAGE_NAME, token);
    this.token = token;
  }

  public static getToken() {
    return this.token;
  }

  public static removeToken() {
    localStorage.removeItem(KOALA_TOKEN_STORAGE_NAME);
    this.token = null;
  }

  public static hasToken() {
    return !!this.token && !!localStorage.getItem(KOALA_TOKEN_STORAGE_NAME);
  }

  public static logout() {
    this.removeToken();
  }
}
