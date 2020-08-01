import { DynamicFormTypeFieldEnum } from '../enums/dynamic-form-type-field.enum';
import { FloatLabelType, MatFormFieldAppearance } from '@angular/material/form-field';

export interface KoalaDynamicFormFieldInterface {
  label: string;
  name: string;
  required?: boolean;
  type: DynamicFormTypeFieldEnum;
  appearance?: MatFormFieldAppearance;
  floatLabel?: FloatLabelType;
  value?: string;
  textHint?: string;
  opcoesSelect?: {
    value: string;
    name: string;
  }[];
  class?: string;
  fieldClass?: string;
}