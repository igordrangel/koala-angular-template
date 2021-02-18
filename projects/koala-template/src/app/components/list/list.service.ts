import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { koala } from "koala-utils";
import { ListItemInterface } from "./list-item.interface";
import { KoalaListFormFilterInterface } from "../../../../../ngx-koala/src/lib/shared/components/list/koala-list-form-filter.interface";

@Injectable({providedIn: "any"})
export class ListService {

  public getList(params?: KoalaListFormFilterInterface) {
    return new Observable<ListItemInterface[]>(observe => {
      observe.error(new Error("Error"));
    });
  }
}
