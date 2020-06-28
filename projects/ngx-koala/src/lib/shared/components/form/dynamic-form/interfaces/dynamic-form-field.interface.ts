import { DynamicFormTypeFieldEnum } from '../enums/dynamic-form-type-field.enum';

export interface DynamicFormFieldInterface {
  label: string;
  name: string;
  required?: boolean;
  type: DynamicFormTypeFieldEnum;
  value?: string;
  textHint?: string;
  opcoesSelect?: {
    value: string;
    name: string;
  }[];
}
