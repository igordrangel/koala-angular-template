import { Injectable } from '@angular/core';
import { ListBuilder } from "../../components/list/list-builder/list.builder";
import { FormBuilder } from "@angular/forms";

@Injectable({providedIn: "any"})
export class KoalaListService {

  constructor(private fb: FormBuilder) {
  }

  public build<DataType>() {
    return new ListBuilder<DataType>(this.fb);
  }
}
