import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import jwt from 'jwt-decode';
import { koalaEnviroment } from '../../../environments/koala.environment';

@Injectable()
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
    return jwt(localStorage.getItem(this.storageName));
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
    let token = localStorage.getItem(this.storageName);
    if (token) {
      this.tokenSubject.next(token);
    }
    setInterval(() => {
      token = localStorage.getItem(this.storageName);
      if (!token) {
        this.tokenSubject.next(null);
      }
    }, 1000);
  }
}
