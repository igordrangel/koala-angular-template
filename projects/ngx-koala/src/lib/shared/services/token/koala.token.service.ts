import jwt from 'jwt-decode';

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenFactory } from "./token.factory";

@Injectable({providedIn: "any"})
export class KoalaTokenService {
  private token$ = new BehaviorSubject<string>(null);

  constructor() {
    this.verifySession();
  }

  public setToken(token: string) {
    TokenFactory.setToken(token);
  }

  public getToken(): BehaviorSubject<string> {
    return this.token$;
  }

  public getDecodedToken<T>(): T {
    return (TokenFactory.hasToken() ? jwt(TokenFactory.getToken()) : null);
  }

  public removeToken() {
    TokenFactory.removeToken();
  }

  private verifySession() {
    TokenFactory.init();
    this.token$.next(TokenFactory.getToken());
    setInterval(() => {
      if (!TokenFactory.hasToken() && this.token$.getValue()) {
        this.token$.next(null);
      } else if (TokenFactory.hasToken() && !this.token$.getValue()) {
        this.token$.next(TokenFactory.getToken());
      }
    }, 300);
  }
}
