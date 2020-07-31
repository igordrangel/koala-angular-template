const TOKEN_KEY = 'multideskAuthToken';

export class TokenHelper {
  public static hasToken(): boolean {
    return !!this.getToken();
  }

  public static getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public static setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  public static removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  }
}
