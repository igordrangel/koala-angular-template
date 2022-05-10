import jwt from 'jwt-decode';

import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
import { TokenFactory } from "./token.factory";
import { MatFormFieldHelper } from "../../helpers/mat-form-field.helper";

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
  private intervalToken: Subscription;
  private intervalFixMatFormField: Subscription;

  constructor() {
    this.verifySession();
  }

  ngOnDestroy() {
    this.intervalToken?.unsubscribe();
    this.intervalFixMatFormField?.unsubscribe();
  }

  public setToken(token: string) {
    if (TokenFactory.hasToken()) { this.token$.next(token); }
    TokenFactory.setToken(token);

    this.intervalFixMatFormField = interval(1000).subscribe(() => MatFormFieldHelper.fixDisabledStateForDisabledFields());
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
    this.intervalFixMatFormField?.unsubscribe();
  }

  private verifySession() {
    TokenFactory.init();
    this.token$.next(TokenFactory.getToken());
    this.intervalToken = interval(300).subscribe(() => {
      if (!TokenFactory.hasToken() && this.token$.getValue()) {
        this.token$.next(null);
      } else if (TokenFactory.hasToken() && !this.token$.getValue()) {
        this.token$.next(TokenFactory.getToken());
      }
    });
  }
}
