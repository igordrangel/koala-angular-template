import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from "@angular/common/http";
import { KoalaOAuth2Service } from "../openid/koala.oauth2.service";
import jwtDecode from "jwt-decode";
import { Observable, Subscription } from "rxjs";
import { KlDelay } from "koala-utils/dist/utils/KlDelay";
import { KoalaErrorsHelper } from "./helpers/error/koala.errors.helper";
import { KoalaRequestHeaderHelper } from "./helpers/service/koala.request-header.helper";
import { KoalaResponseFactory } from "./factory/koala.response.factory";
import { KoalaEnvironment } from "../../../environments/koalaEnvironment";

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

  public async cancelRequests() {
    for (let subscribe of this._subscriptions.values()) {
      subscribe.unsubscribe();
    }
  }

  private async get<T>(url: string, params: HttpParams): Promise<T> {
    return new Promise<T>(async (resolve, reject) => {
      let tryRequest = 0;
      let conclusion = false;
      let success = false;
      do {
        conclusion = false;
        tryRequest++;
        this._subscriptions
            .push(this.http.get<T>(`${this.getUrlBase()}/${url}`, {
              observe: 'response',
              headers: KoalaRequestHeaderHelper.add(this.getToken()),
              params
            }).subscribe(response => {
              conclusion = true;
              success = true;
              if (response) {
                resolve(response.body);
              }
            }, (err: HttpErrorResponse) => {
              conclusion = true;
              if (tryRequest >= 3) {
                reject(err);
              }
            }));
        while (!conclusion) {
          await KlDelay.waitFor(300);
        }
      } while (tryRequest < 3 && !success);
    });
  }

  private async postPutDelete(method: ApiRequesterType, url: string, data: any): Promise<HttpResponse<any>> {
    return new Promise<HttpResponse<any>>(async (resolve, reject) => {
      let tryRequest = 0;
      let conclusion = false;
      let success = false;
      do {
        conclusion = false;
        tryRequest++;
        const req = (method == 'post') ?
                    this.http.post<HttpResponse<any>>(`${this.getUrlBase()}/${url}`, data, {
                      observe: 'response',
                      headers: KoalaRequestHeaderHelper.add(this.getToken())
                    }) : ((method == 'put') ?
                          this.http.put<HttpResponse<any>>(`${this.getUrlBase()}/${url}`, data, {
                            observe: 'response',
                            headers: KoalaRequestHeaderHelper.add(this.getToken())
                          }) : ((method == 'patch') ?
                                this.http.patch<HttpResponse<any>>(`${this.getUrlBase()}/${url}`, data, {
                                  observe: 'response',
                                  headers: KoalaRequestHeaderHelper.add(this.getToken())
                                }) :
                                this.http.delete<HttpResponse<any>>(`${this.getUrlBase()}/${url}`, {
                                  observe: 'response',
                                  headers: KoalaRequestHeaderHelper.add(this.getToken())
                                }))
                    );

        this._subscriptions
            .push(req.subscribe(response => {
              conclusion = true;
              success = true;
              if (response) {
                resolve(response);
              } else {
                reject(new Error("A requisição não obteve uma resposta."));
              }
            }, error => {
              conclusion = true;
              if (tryRequest >= 3) {
                reject(error);
              }
            }));
        while (!conclusion) {
          await KlDelay.waitFor(300);
        }
      } while (tryRequest < 3 && !success);
    });
  }

  private promiseGetData<T>(promise: Promise<T>): Observable<T> {
    return new Observable<T>(observe => {
      promise.then(response => {
        observe.next(response);
        observe.complete();
      }).catch(e => {
        if (e.status === 401) {
          this.oauth2Service.logout();
        }
        observe.error(KoalaErrorsHelper.generate(e));
      });
    });
  }

  private promiseSendData<T>(promise: Promise<HttpResponse<any>>, urlRequest?: string): Observable<T> {
    return new Observable<T>(observe => {
      this._tryRequestRepeat++;
      promise.then(response => KoalaResponseFactory.generateResponse(response, urlRequest)
                                                   .then(success => {
                                                     observe.next(success as any);
                                                     observe.complete();
                                                   })
                                                   .catch(error => {
                                                     if (error.status === 401) {
                                                       this.oauth2Service.logout();
                                                     }
                                                     observe.error(error);
                                                   }))
             .catch(e => observe.error(KoalaErrorsHelper.generate(e)));
    });
  }

  private getToken() {
    const tmpToken = localStorage.getItem(KoalaEnvironment.environment?.storageTokenName);
    if (tmpToken) {
      const koalaToken = jwtDecode(localStorage.getItem(KoalaEnvironment.environment?.storageTokenName)) as any;
      return koalaToken.accessToken;
    }

    return null;
  }

  private getUrlBase() {
    return this.isMockup ? 'http://localhost:4200/assets/mockup' : this.apiUrl;
  }
}
