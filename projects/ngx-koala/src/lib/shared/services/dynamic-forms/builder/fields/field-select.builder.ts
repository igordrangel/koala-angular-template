import { FieldSelectBase } from "./field-select.base";
import { DynamicFormTypeFieldEnum } from "../../../../components/form/dynamic-form/enums/dynamic-form-type-field.enum";
import { FormBuilder } from "@angular/forms";
import { KoalaDynamicFormConfigInterface } from "../../../../components/form/dynamic-form/interfaces/koala.dynamic-form-config.interface";

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
