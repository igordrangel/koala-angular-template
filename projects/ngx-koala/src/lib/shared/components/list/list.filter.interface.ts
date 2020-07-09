import { DynamicFormFieldInterface } from '../form/dynamic-form/interfaces/dynamic-form-field.interface';

export interface ListFilterInterface {
  main: DynamicFormFieldInterface[];
  advanced?: DynamicFormFieldInterface[];
  checkAndSearch?: {
    formControlName: string;
    label: string;
  };
}
