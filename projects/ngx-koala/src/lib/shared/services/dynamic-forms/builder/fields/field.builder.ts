import { DynamicFormTypeFieldEnum } from "../../../../components/form/dynamic-form/enums/dynamic-form-type-field.enum";
import { FieldBase } from "./field.base";
import { FormBuilder } from "@angular/forms";
import { KoalaDynamicFormConfigInterface } from "../../../../components/form/dynamic-form/interfaces/koala.dynamic-form-config.interface";

export class FieldBuilder extends FieldBase {

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
