import { FieldBase } from "./field.base";

export class FieldSelectBase extends FieldBase {

  public multiple(multiple: boolean = true) {
    this.fieldConfig.multiple = true;
  }
}
