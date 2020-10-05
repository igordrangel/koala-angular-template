import { DynamicFormTypeFieldEnum } from '../enums/dynamic-form-type-field.enum';
import { FloatLabelType, MatFormFieldAppearance } from '@angular/material/form-field';
import { BehaviorSubject } from 'rxjs';
import { AsyncValidatorFn, FormGroup } from '@angular/forms';
import { KoalaDynamicSetValueInterface } from './koala.dynamic-set-value.interface';

export interface KoalaDynamicFormFieldInterface {
  label?: string;
  name: string;
  required?: boolean;
  focus?: boolean;
  type: DynamicFormTypeFieldEnum;
  appearance?: MatFormFieldAppearance;
  floatLabel?: FloatLabelType;
  value?: any;
  valueSubject?: BehaviorSubject<any>;
  textHint?: string;
  placeholder?: string;
  multiple?: boolean;
  opcoesSelect?: {
    value: any;
    name: string;
  }[];
  class?: string;
  fieldClass?: string;
  moreItemsButtonIconAddlabel?: string;
  moreItemsMinItems?: number;
  moreItemsMaxItems?: number;
  moreItemsIcon?: string;
  moreItemsConfig?: {
    form: FormGroup;
    formConfig: KoalaDynamicFormFieldInterface[];
    setValues?: BehaviorSubject<BehaviorSubject<KoalaDynamicSetValueInterface[]>[]>;
  };
  valueChanges?: (value: any) => void;
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[];
}
