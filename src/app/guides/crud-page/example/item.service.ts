import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { koala } from "@koalarx/utils";

export interface ItemInterface {
  id?: number;
  name: string;
  description: string;
}

export class ItemsDB {
  public static itemsList: ItemInterface[] = [];
}

@Injectable({providedIn: "any"})
export class ItemService {

  public save(data: ItemInterface) {
    return new Observable<ItemInterface>(observe => {
      if (data.id) {
        ItemsDB.itemsList[data.id - 1] = data;
      } else {
        data.id = ItemsDB.itemsList.length + 1;
        ItemsDB.itemsList.push(data);
      }
      observe.next(data);
      observe.complete();
    });
  }

  public getAll() {
    return new Observable<ItemInterface[]>(observe => {
      observe.next(ItemsDB.itemsList);
      observe.complete();
    });
  }

  public delete(id: number) {
    ItemsDB.itemsList = koala(ItemsDB.itemsList)
      .array<ItemInterface>()
      .map(item => {
        return (item.id === id ? null : item);
      })
      .clearEmptyValues()
      .map((item, index) => {
        item.id = index + 1;
        return item;
      })
      .getValue();
  }
}
