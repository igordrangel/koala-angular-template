import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { KoalaOAuth2Service } from "../openid/koala.oauth2.service";
import { Observable, Subscription } from "rxjs";
import { KoalaErrorsHelper } from "./helpers/error/koala.errors.helper";
import { KoalaRequestHeaderHelper } from "./helpers/service/koala.request-header.helper";
import { KoalaResponseFactory } from "./factory/koala.response.factory";
import { first, map } from "rxjs/operators";
import { TokenFactory } from "../token/token.factory";

export type ApiRequesterType = 'get' | 'post' | 'put' | 'patch' | 'delete';

@Injectable({providedIn: "root"})
export class KoalaApiRequesterService {
  public apiUrl: string;
  public isMockup = false;
  private subscriptions: Subscription[] = [];

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
    for (let subscribe of this.subscriptions.values()) {
      subscribe.unsubscribe();
    }
  }

  private get<T>(url: string, params: HttpParams) {
    return this.getMethod<T>('get', url, params)
               .pipe(map(response => {
                 return response.body
               }));
  }

  private postPutDelete(method: ApiRequesterType, url: string, data: any) {
    return this.getMethod<HttpResponse<any>>(method, url, data);
  }

  private promiseGetData<T>(request: Observable<T>): Observable<T> {
    return new Observable<T>(observe => {
      this.subscriptions
          .push(request.pipe(first())
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
                       }));
    });
  }

  private promiseSendData<T>(request: Observable<HttpResponse<any>>, urlRequest?: string): Observable<T> {
    return new Observable<T>(observe => {
      this.subscriptions
          .push(request.pipe(first())
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
                       }));
    });
  }

  private getUrlBase() {
    return this.isMockup ? `${location.origin}/assets/mockup` : this.apiUrl;
  }

  private getMethod<T>(method: ApiRequesterType, url: string, data: any | HttpParams = {}) {
    const options = {
      observe: 'response',
      headers: KoalaRequestHeaderHelper.add(TokenFactory.getToken())
    } as {
      headers?: HttpHeaders | {[p: string]: string | string[]};
      observe: "response";
      params?: HttpParams | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
      };
    };

    switch (method) {
      case "post":
        return this.http.post<T>(`${this.getUrlBase()}/${url}`, data, options);
      case "put":
        return this.http.put<T>(`${this.getUrlBase()}/${url}`, data, options);
      case "patch":
        return this.http.patch<T>(`${this.getUrlBase()}/${url}`, data, options);
      case "delete":
        return this.http.delete<T>(`${this.getUrlBase()}/${url}`, options);
      case "get":
        options.params = data;
        return this.http.get<T>(`${this.getUrlBase()}/${url}`, options);
    }
  }
}
