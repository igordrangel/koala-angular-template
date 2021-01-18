import jwt from 'jwt-decode';

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { koalaEnviroment } from '../../../environments/koala.environment';

@Injectable({providedIn: "any"})
export class KoalaTokenService {
  readonly storageName: string;
  private tokenSubject = new BehaviorSubject<string>(null);

  constructor() {
    this.storageName = koalaEnviroment.storageTokenName;
    this.verifySession();
  }

  public setToken(token: string) {
    try {
      this.verifyStorageName();
      localStorage.setItem(this.storageName, token);
      this.tokenSubject.next(token);
    } catch (e) {
      throw e;
    }
  }

  public getTokenSubject(): BehaviorSubject<string> {
    return this.tokenSubject;
  }

  public getUser<U>(): U {
    const token = this.getToken();
    return (token ? jwt(token) : null);
  }

  public removeToken() {
    try {
      this.verifyStorageName();
      localStorage.removeItem(this.storageName);
      if (this.tokenSubject) {
        this.tokenSubject.next(null);
      }
    } catch (e) {
      throw e;
    }
  }

  private verifyStorageName() {
    if (!this.storageName) {
      throw new Error("Storage name is not defined.");
    }
  }

  private verifySession() {
    let token = this.getToken();
    if (token) {
      this.tokenSubject.next(token);
    }
    setInterval(() => {
      token = localStorage.getItem(this.storageName);
      if (!token && this.tokenSubject.value !== null) {
        this.tokenSubject.next(null);
      }
    }, 1000);
  }

  private getToken() {
    return localStorage.getItem(this.storageName);
  }
}
