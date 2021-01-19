import { Component } from "@angular/core";
import { PageAbstract } from "../../shared/abstract/page.abstract";
import { KoalaRequestService } from "../../../../../ngx-koala/src/lib/shared/services/request/koala.request.service";
import { Observable } from "rxjs";

interface ResponseInterface {
  message: string;
}

@Component({
  templateUrl: 'page-request.component.html'
})
export class PageRequestComponent extends PageAbstract {

  constructor(private requestService: KoalaRequestService) {
    super();
  }

  public requestSuccess() {
    this.requestService
        .request<ResponseInterface>(
          new Observable<ResponseInterface>(observe => observe.next({
            message: 'This request run with success!'
          })),
          response => alert(response.message),
          error => alert(error.message)
        );
  }

  public requestError() {
    this.requestService
        .request<ResponseInterface>(
          new Observable<ResponseInterface>(observe => observe.error({
            message: 'Error'
          })),
          response => alert(response.message),
          error => alert(error.message)
        );
  }
}
