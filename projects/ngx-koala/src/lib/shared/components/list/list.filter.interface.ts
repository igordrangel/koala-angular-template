import { KoalaDynamicFormFieldInterface } from '../form/dynamic-form/interfaces/koala.dynamic-form-field.interface';

export interface ListFilterInterface {
  main: KoalaDynamicFormFieldInterface[];
  advanced?: KoalaDynamicFormFieldInterface[];
  checkAndSearch?: {
    formControlName: string;
    label: string;
  };
}
