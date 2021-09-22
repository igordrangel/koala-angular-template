import { Injectable } from '@angular/core';
import { ListBuilder } from "./list-builder/list.builder";

@Injectable({providedIn: "any"})
export class KoalaListService {

  public build<DataType>() {
    return new ListBuilder<DataType>();
  }
}
