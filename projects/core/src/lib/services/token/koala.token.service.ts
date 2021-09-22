import jwt from 'jwt-decode';

import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenFactory } from "./token.factory";

export interface KoalaOAuth2TokenInterface {
  accessToken: string;
  idToken: string;
  refreshToken: string;
  login: string;
  expired: number;
  code: string;
}

@Injectable({providedIn: "any"})
export class KoalaTokenService implements OnDestroy {
  private token$ = new BehaviorSubject<string>(null);
  private intervalToken: any;

  constructor() {
    this.verifySession();
  }

  ngOnDestroy() {
    if (this.intervalToken) {
      clearInterval(this.intervalToken);
    }
  }

  public setToken(token: string) {
    if (TokenFactory.hasToken()) { this.token$.next(token); }
    TokenFactory.setToken(token);
  }

  public getToken(): BehaviorSubject<string> {
    return this.token$;
  }

  public getDecodedToken<T>(): T|null {
    return (TokenFactory.hasToken() ? jwt(TokenFactory.getToken()) : null);
  }

  public getOAuth2Token(): KoalaOAuth2TokenInterface|null {
    return (TokenFactory.hasToken() ? jwt(TokenFactory.getToken()) : null);
  }

  public removeToken() {
    TokenFactory.removeToken();
  }

  private verifySession() {
    TokenFactory.init();
    this.token$.next(TokenFactory.getToken());
    this.intervalToken = setInterval(() => {
      if (!TokenFactory.hasToken() && this.token$.getValue()) {
        this.token$.next(null);
      } else if (TokenFactory.hasToken() && !this.token$.getValue()) {
        this.token$.next(TokenFactory.getToken());
      }
    }, 300);
  }
}
