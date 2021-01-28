import { FormGroup } from "@angular/forms";
import { KoalaDynamicFormFieldInterface } from "../../../components/form/dynamic-form/interfaces/koala.dynamic-form-field.interface";
import { BehaviorSubject } from "rxjs";
import { KoalaDynamicSetValueInterface } from "../../../components/form/dynamic-form/interfaces/koala.dynamic-set-value.interface";
import { KoalaDynamicFormShowFieldInterface } from "../../../components/form/dynamic-form/interfaces/koala.dynamic-form-show-field.interface";

export interface KoalaDynamicFormConfigInterface {
  form: FormGroup;
  formConfig: KoalaDynamicFormFieldInterface[];
  setValues?: BehaviorSubject<KoalaDynamicSetValueInterface[]>;
  showFields?: BehaviorSubject<KoalaDynamicFormShowFieldInterface[]>;
}
