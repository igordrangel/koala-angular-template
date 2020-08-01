import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { MultideskController } from './controllers/multidesk.controller';
import { ApiHelper } from './helpers/service/api.helper';
import { ApiMethodEnum } from './enum/api-method.enum';
import { RequestHeaderHelper } from './helpers/service/request-header.helper';
import { MultideskResponseInterface } from './interfaces/service/multidesk-response.interface';
import { ErrorsHelper } from './helpers/error/errors.helper';

@Injectable({providedIn: 'root'})
export class MultideskService {
  private readonly _apiUrl: string;
  private _subscriptions: Subscription[] = [];

  constructor(private http: HttpClient) {
    this._apiUrl = ApiHelper.getApi(MultideskController.getEnviroment()).url;
  }

  public async request<T>(method: ApiMethodEnum, url: string, data: any = {}): Promise<T> {
    if (data.__zone_symbol__state) {
      data = data.__zone_symbol__value;
    }
    switch (method) {
      case ApiMethodEnum.post:
      case ApiMethodEnum.put:
      case ApiMethodEnum.patch:
        return this.promiseSendData<T>(this.postPut(method, url, data));
      case ApiMethodEnum.get:
        let httpParams = new HttpParams();
        Object.keys(data).forEach((key) => {
          const dado = data[key];
          if (typeof dado === 'object') {
            if (dado && dado.hasOwnProperty('length') && dado.length > 0) {
              dado.forEach((item: any) => {
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
      case ApiMethodEnum.delete:
        return this.promiseSendData<T>(this.delete(url));
    }
  }

  public async cancelRequests() {
    for (const subscribe of this._subscriptions.values()) {
      subscribe.unsubscribe();
    }
  }

  private async get<T>(url: string, params: HttpParams): Promise<T> {
    return new Promise<T>(async (resolve, reject) => {
      this._subscriptions.push(
        this.http
            .get<MultideskResponseInterface>(this._apiUrl + '/' + url, {
              headers: RequestHeaderHelper.add(),
              params,
            })
            .subscribe(
              (response) => {
                if (response) {
                  resolve(response.data as any);
                }
              },
              (err: HttpErrorResponse) => reject(err),
            ),
      );
    });
  }

  private async postPut(method: ApiMethodEnum, url: string, data: any): Promise<MultideskResponseInterface> {
    return new Promise<MultideskResponseInterface>(async (resolve, reject) => {
      let req: Observable<MultideskResponseInterface>;
      if (method === ApiMethodEnum.post) {
        req = this.http.post<MultideskResponseInterface>(this._apiUrl + '/' + url, data, {
          headers: RequestHeaderHelper.add(),
        });
      } else if (method === ApiMethodEnum.put) {
        req = this.http.put<MultideskResponseInterface>(this._apiUrl + '/' + url, data, {
          headers: RequestHeaderHelper.add(),
        });
      } else {
        req = this.http.patch<MultideskResponseInterface>(this._apiUrl + '/' + url, data, {
          headers: RequestHeaderHelper.add(),
        });
      }

      this._subscriptions.push(
        req.subscribe(
          (response) => {
            if (response) {
              resolve(response);
            } else {
              reject(new Error('A requisição não obteve uma resposta.'));
            }
          },
          (error) => reject(error),
        ),
      );
    });
  }

  private async delete(url: string): Promise<MultideskResponseInterface> {
    return new Promise<MultideskResponseInterface>(async (resolve, reject) => {
      this._subscriptions.push(
        this.http
            .delete<MultideskResponseInterface>(this._apiUrl + '/' + url, {
              headers: RequestHeaderHelper.add(),
            })
            .subscribe(
              (response) => {
                if (response) {
                  resolve(response);
                } else {
                  reject(new Error('A requisição não obteve uma resposta.'));
                }
              },
              (error) => reject(error),
            ),
      );
    });
  }

  private async promiseGetData<T>(promise: Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      promise.then((response) => resolve(response)).catch((e) => reject(ErrorsHelper.generate(e)));
    });
  }

  private async promiseSendData<T>(promise: Promise<MultideskResponseInterface>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      promise.then((response) => resolve(response as any)).catch((e) => reject(ErrorsHelper.generate(e)));
    });
  }
}
