import { KoalaDynamicFormConfigInterface } from "@koalarx/ui/form";

export interface KoalaListFilterInterface {
  main?: KoalaDynamicFormConfigInterface;
  advanced?: KoalaDynamicFormConfigInterface;
  checkAndSearch?: {
    formControlName: string;
    label: string;
    isChecked?: boolean;
  };
}
