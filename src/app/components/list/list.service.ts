import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { koala } from "@koalarx/utils";
import { ListItemInterface } from "./list-item.interface";
import { KoalaListFormFilterInterface } from "@koalarx/ui/list";

@Injectable({providedIn: "any"})
export class ListService {

  public getList(params?: KoalaListFormFilterInterface) {
    return new Observable<ListItemInterface[]>(observe => {
      if (params.params.name === 'Test Error') {
        observe.error(new Error('Test Error'));
      } else {
        observe.next(koala([
          {name: 'Item 1', qtd: 5, value: 3000},
          {name: 'Item 2', qtd: 2, value: 8000},
          {name: 'Item 3', qtd: 4, value: 5000},
          {name: 'Item 4', qtd: 1, value: 4000},
          {name: 'Item 5', qtd: 6, value: 6000},
          {name: 'Item 6', qtd: 3, value: 2000},
          {name: 'Item 7', qtd: 9, value: 1000},
          {name: 'Item 8', qtd: 0, value: 0},
          {name: 'Item 9', qtd: 0, value: 0},
          {name: 'Item 10', qtd: 0, value: 0}
        ]).array<ListItemInterface>()
          .filter(params?.params?.name ?? '', 'name')
          .orderBy(params?.sort, params?.order.toUpperCase() === 'DESC')
          .getValue());
      }
    });
  }
}
