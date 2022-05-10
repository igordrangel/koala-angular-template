import { koala } from "@koalarx/utils";
import { BehaviorSubject } from "rxjs";
import { KoalaApiRequesterService } from "./koala.api-requester.service";
import { KoalaResponseInterface } from "./helpers/error/koala.errors.helper";
import { KoalaEnvironment } from "../../environments/koalaEnvironment";

export abstract class KoalaApiRequesterBase<EntityType, GetAllType, DataType> {

  protected constructor(
    protected koalaService: KoalaApiRequesterService,
    protected endpoint: string,
    environmentNameToEndpointApi = 'endpointApi',
    isMockup = false
  ) {
    koalaService.apiUrl = KoalaEnvironment.environment?.[environmentNameToEndpointApi];
    koalaService.isMockup = isMockup;
  }

  public getAll(filter?: BehaviorSubject<any> | any) {
    return this.koalaService.request<GetAllType>('get', this.endpoint, this.getParams(filter));
  }

  public getById(id: number) {
    return this.koalaService.request<EntityType>('get', this.endpoint + '/' + id);
  }

  public getBySomething<Type>(something: any) {
    return this.koalaService.request<Type>('get', this.endpoint + '/' + something);
  }

  public save(data: DataType, id?: number) {
    return this.koalaService.request<KoalaResponseInterface>(
      (id ? 'put' : 'post'),
      `${this.endpoint}${(id ? `/${id}` : '')}`,
      data
    );
  }

  public delete(id: number) {
    return this.koalaService.request<KoalaResponseInterface>('delete', this.endpoint + '/' + id)
  }

  public async cancelRequests() {
    await this.koalaService.cancelRequests();
  }

  public async getParams(params?: BehaviorSubject<any> | any) {
    let filter = {} as any;
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
      Object.keys(filter.params).forEach(indexName => {
        if (
          `${filter.params[indexName]}` === 'NaN' ||
          filter.params[indexName] === null
        ) {
          filter.params[indexName] = '';
        }
      });
      return koala({})
        .object()
        .merge(filter.params)
        .merge({
          sort: filter.sort,
          order: filter.order,
          limit: filter.limit,
          page: filter.page
        })
        .getValue();
    }

    return filter ?? null;
  }
}
