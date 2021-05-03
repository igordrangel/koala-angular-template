import { koala } from "koala-utils";
import { BehaviorSubject, Observable } from "rxjs";
import { KoalaApiRequesterService } from "./koala.api-requester.service";
import { KoalaListFormFilterInterface } from "../../components/list/koala-list-form-filter.interface";
import { KoalaResponseInterface } from "./helpers/error/koala.errors.helper";
import { koalaEnvironment } from "../../../environments/koala.environment";

export abstract class KoalaApiRequesterBase<EntityType, GetAllType, DataType> {

  protected constructor(
    protected _pneService: KoalaApiRequesterService,
    protected endpoint: string,
    isMockup = false
  ) {
    _pneService.apiUrl = koalaEnvironment.endpointApi;
    _pneService.isMockup = isMockup;
  }

  public getAll(filter?: BehaviorSubject<KoalaListFormFilterInterface> | KoalaListFormFilterInterface) {
    return new Observable<GetAllType>(observe => {
      this._pneService
          .request<GetAllType>('get', this.endpoint, this.getParams(filter))
          .then(response => {
            observe.next(response);
            observe.complete();
          })
          .catch(error => {
            if (error.statusCode === 404) {
              observe.next(null);
            } else {
              observe.error(error);
            }
            observe.complete();
          });
    });
  }

  public getById(id: number) {
    return this.builtObservableRequest<EntityType>(
      this._pneService.request('get', this.endpoint + '/' + id)
    );
  }

  public getBySomething(something: any) {
    return this.builtObservableRequest<EntityType>(
      this._pneService.request('get', this.endpoint + '/' + something)
    );
  }

  public save(data: DataType, id?: number) {
    return this.builtObservableRequest<KoalaResponseInterface>(
      this._pneService
          .request(
            (id ? 'put' : 'post'),
            `${this.endpoint}${(id ? `/${id}` : '')}`,
            data
          )
    );
  }

  public delete(id: number) {
    return this.builtObservableRequest<EntityType>(
      this._pneService.request('delete', this.endpoint + '/' + id)
    );
  }

  public async cancelRequests() {
    await this._pneService.cancelRequests();
  }

  public async getParams(params?: BehaviorSubject<KoalaListFormFilterInterface> | KoalaListFormFilterInterface) {
    let filter = {} as KoalaListFormFilterInterface;
    if (params instanceof BehaviorSubject) {
      Object.assign(filter, params?.getValue() ?? {});
    } else {
      Object.assign(filter, params ?? {});
    }
    if (
      filter &&
      filter.hasOwnProperty('sort') &&
      filter.hasOwnProperty('order') &&
      filter.hasOwnProperty('limit') &&
      filter.hasOwnProperty('page') &&
      filter.hasOwnProperty('params')
    ) {
      filter.page++;
      Object.keys(filter.params).forEach(indexName => {
        if (
          `${filter.params[indexName]}` === 'NaN' ||
          filter.params[indexName] === null
        ) {
          filter.params[indexName] = '';
        }
      });
      return koala({}).object().merge(filter.params).merge({
        sort: filter.sort,
        order: filter.order,
        limit: filter.limit,
        page: filter.page
      }).getValue();
    }

    return filter ?? null;
  }

  public builtObservableRequest<T>(request: Promise<T>) {
    return new Observable<T>(observe => {
      request.then(response => {
               observe.next(response);
               observe.complete();
             })
             .catch(error => {
               observe.error(error);
               observe.complete();
             });
    });
  }
}
