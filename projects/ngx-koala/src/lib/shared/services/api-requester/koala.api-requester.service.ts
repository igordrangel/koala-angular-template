import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { KoalaOAuth2Service } from "../openid/koala.oauth2.service";
import { Observable, Subscription } from "rxjs";
import { KoalaErrorsHelper } from "./helpers/error/koala.errors.helper";
import { KoalaRequestHeaderHelper } from "./helpers/service/koala.request-header.helper";
import { KoalaResponseFactory } from "./factory/koala.response.factory";
import { KoalaEnvironment } from "../../../environments/koalaEnvironment";
import { map, take } from "rxjs/operators";

export type ApiRequesterType = 'get' | 'post' | 'put' | 'patch' | 'delete';

@Injectable({providedIn: "any"})
export class KoalaApiRequesterService {
  public apiUrl: string;
  public isMockup = false;
  private _tryRequestRepeat = 0;
  private _subscriptions: Subscription[] = [];

  constructor(
    private http: HttpClient,
    private oauth2Service: KoalaOAuth2Service
  ) {
  }

  public request<T>(method: ApiRequesterType, url: string, data: any = {}): Observable<T> {
    if (data.__zone_symbol__state) {
      data = data.__zone_symbol__value;
    }
    switch (method) {
      case 'post':
      case 'put':
      case 'patch':
      case 'delete':
        return this.promiseSendData<T>(this.postPutDelete(method, url, data), url);
      case 'get':
        let httpParams = new HttpParams();
        Object.keys(data ?? {}).forEach((key) => {
          let dado = data[key];
          if (typeof dado == "object") {
            if (dado && dado.hasOwnProperty('length') && dado.length > 0) {
              dado.forEach(item => {
                httpParams = httpParams.append(`${key.replace('[]', '')}[]`, item);
              });
            } else {
              httpParams = httpParams.append(key, dado);
            }
          } else {
            httpParams = httpParams.append(key, dado);
          }
        });
        return this.promiseGetData<T>(this.get(url, httpParams));
    }
  }

  public cancelRequests() {
    for (let subscribe of this._subscriptions.values()) {
      subscribe.unsubscribe();
    }
  }

  private get<T>(url: string, params: HttpParams) {
    return this.http
               .get<T>(`${this.getUrlBase()}/${url}`, {
                 observe: 'response',
                 headers: KoalaRequestHeaderHelper.add(this.getToken()),
                 params
               })
               .pipe(map(response => {
                 return response.body;
               }));
  }

  private postPutDelete(method: ApiRequesterType, url: string, data: any) {
    return this.getMethod(method)<HttpResponse<any>>(`${this.getUrlBase()}/${url}`, data, {
      observe: 'response',
      headers: KoalaRequestHeaderHelper.add(this.getToken())
    });
  }

  private promiseGetData<T>(request: Observable<T>): Observable<T> {
    return new Observable<T>(observe => {
      request.pipe(take(1))
             .subscribe({
               next: response => {
                 observe.next(response);
                 observe.complete();
               },
               error: e => {
                 if (e.status === 401) {
                   this.oauth2Service.logout();
                 }
                 observe.error(KoalaErrorsHelper.generate(e));
               }
             });
    });
  }

  private promiseSendData<T>(request: Observable<HttpResponse<any>>, urlRequest?: string): Observable<T> {
    return new Observable<T>(observe => {
      this._tryRequestRepeat++;
      request.pipe(take(1))
             .subscribe({
               next: response => KoalaResponseFactory.generateResponse(response, urlRequest)
                                                     .then(success => {
                                                       observe.next(success as any);
                                                       observe.complete();
                                                     })
                                                     .catch(error => {
                                                       if (error.status === 401) {
                                                         this.oauth2Service.logout();
                                                       }
                                                       observe.error(error);
                                                     }),
               error: e => observe.error(KoalaErrorsHelper.generate(e))
             });
    });
  }

  private getToken() {
    return localStorage.getItem(KoalaEnvironment.environment?.storageTokenName);
  }

  private getUrlBase() {
    return this.isMockup ? 'http://localhost:4200/assets/mockup' : this.apiUrl;
  }

  private getMethod(method: ApiRequesterType) {
    switch (method) {
      case "post":
        return this.http.post;
      case "put":
        return this.http.put;
      case "patch":
        return this.http.patch;
      case "delete":
        return this.http.delete;
      case "get":
        return this.http.get;
    }
  }
}
