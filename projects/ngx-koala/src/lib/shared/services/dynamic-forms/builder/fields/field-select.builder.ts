import { FieldSelectBase } from "./field-select.base";
import { DynamicFormTypeFieldEnum } from "../../../../components/form/dynamic-form/enums/dynamic-form-type-field.enum";
import { KoalaDynamicFormConfigInterface } from "../koala.dynamic-form-config.interface";
import { FormBuilder } from "@angular/forms";

export class FieldSelectBuilder extends FieldSelectBase {

  constructor(
    label: string,
    name: string,
    type: DynamicFormTypeFieldEnum,
    formConfig: KoalaDynamicFormConfigInterface,
    fb: FormBuilder
  ) {
    super(label, name, type, formConfig, fb);
  }
}
