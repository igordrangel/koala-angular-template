import { KoalaDynamicFormConfigInterface } from "../form/dynamic-form/interfaces/koala.dynamic-form-config.interface";

export interface KoalaListFilterInterface {
  main: KoalaDynamicFormConfigInterface;
  advanced?: KoalaDynamicFormConfigInterface;
  checkAndSearch?: {
    formControlName: string;
    label: string;
    isChecked?: boolean;
  };
}
