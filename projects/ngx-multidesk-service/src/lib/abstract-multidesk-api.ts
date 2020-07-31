import { MultideskService } from './multidesk.service';
import { KoalaObjectHelper } from 'tskoala-helpers/dist/object/koala-object.helper';
import { ResponseInterface } from './interfaces/service/response.interface';
import { ApiMethodEnum } from './enum/api-method.enum';
import { ErrorsHelper } from './helpers/error/errors.helper';

export abstract class AbstractMultideskApi {
  protected constructor(protected _multideskService: MultideskService, protected baseResourceUrl?: string) {
  }

  public getParams<F>(
    params: {
      page: number;
      sort: string;
      order: string;
      limit: number;
    },
    filter: F,
  ) {
    params.page++;
    return KoalaObjectHelper.merge(params, filter);
  }

  public getMainService(): MultideskService {
    return this._multideskService;
  }

  protected get<F, R>(
    filter: F,
    sort: string          = '',
    order: 'asc' | 'desc' = 'asc',
    page: number          = 0,
    limit: number         = 0,
  ): Promise<R> {
    return this._multideskService.request<R>(
      ApiMethodEnum.get,
      this.getBaseResourceUrl(),
      this.getParams<F>(
        {
          page,
          order,
          sort,
          limit,
        },
        filter,
      ),
    );
  }

  protected getById<T>(id: number): Promise<T> {
    return this._multideskService.request<T>(ApiMethodEnum.get, this.getBaseResourceUrl() + '/' + id);
  }

  protected add<D>(data: D) {
    return this.abstractRequest<ResponseInterface>(
      this._multideskService.request(ApiMethodEnum.post, this.getBaseResourceUrl(), data),
    );
  }

  protected edit<D>(id: number, data: D) {
    return this.abstractRequest<ResponseInterface>(
      this._multideskService.request(ApiMethodEnum.put, this.getBaseResourceUrl() + '/' + id, data),
    );
  }

  protected delete(id: number): Promise<ResponseInterface> {
    return this.abstractRequest<ResponseInterface>(
      this._multideskService.request(ApiMethodEnum.delete, this.getBaseResourceUrl() + '/' + id),
    );
  }

  private abstractRequest<T>(promise: Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      if (this.baseResourceUrl) {
        promise.then((response) => resolve(response)).catch((e) => reject(e));
      } else {
        reject(ErrorsHelper.generate(new Error('baseResourceURl is empty.')));
      }
    });
  }

  private getBaseResourceUrl(): string {
    return this.baseResourceUrl ?? 'api-resource-not-found';
  }
}
