export class TokenFactory {
  private static storageName = 'koalaStorageToken';

  private static token?: string;
  private static clientId?: string;
  private static OAuth2Domain?: string;

  public static init() {
    if (!!localStorage.getItem(TokenFactory.storageName)) {
      TokenFactory.setToken(localStorage.getItem(TokenFactory.storageName));
    }
  }

  public static setToken(token: string) {
    localStorage.setItem(this.storageName, token);
    this.token = token;
  }

  public static getToken() {
    return this.token;
  }

  public static removeToken() {
    localStorage.removeItem(this.storageName);
    this.token = null;
  }

  public static hasToken() {
    return !!this.token;
  }
}
