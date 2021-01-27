import { Injectable } from '@angular/core';
import { ListBuilder } from "../../../../../../koala-template/src/app/components/list/list-builder/list.builder";

@Injectable({providedIn: "any"})
export class KoalaListService {

  public build<DataType>() {
    return new ListBuilder<DataType>();
  }
}
