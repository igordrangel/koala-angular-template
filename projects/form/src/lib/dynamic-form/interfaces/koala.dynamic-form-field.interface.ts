import { DynamicFormTypeFieldEnum } from '../enums/dynamic-form-type-field.enum';
import { FloatLabelType, MatFormFieldAppearance } from '@angular/material/form-field';
import { BehaviorSubject, Observable } from 'rxjs';
import { AsyncValidatorFn, UntypedFormGroup, ValidatorFn } from '@angular/forms';
import { KoalaDynamicSetValueInterface } from './koala.dynamic-set-value.interface';
import { KoalaDynamicAutocompleteOptionsInterface } from './koala.dynamic-autocomplete-options.interface';
import { KoalaDynamicFormMoreItensShowFieldConfigInterface } from './koala.dynamic-form-more-itens-show-field-config.interface';
import { KoalaDynamicFormAutocompleteMultipleConfigInterface } from './koala.dynamic-form-autocomplete-multiple-config.interface';
import { KoalaDynamicFormConfigInterface } from './koala.dynamic-form-config.interface';

export interface KoalaDynamicFormFieldInterface {
  show?: boolean;
  label?: string;
  name: string;
  required?: boolean;
  disabled?: boolean;
  min?: number|string;
  max?: number|string;
  minLength?: number;
  maxLength?: number;
  focus?: boolean;
  type: DynamicFormTypeFieldEnum;
  textObs?: string;
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
  moreItemsIconFontColor?: string;
  moreItemsIconBackgroundColor?: string;
  moreItemsConfig?: {
    form: UntypedFormGroup;
    formConfig: KoalaDynamicFormFieldInterface[];
    setValues?: BehaviorSubject<BehaviorSubject<KoalaDynamicSetValueInterface[]>[]>;
    showFieldsConfig?: KoalaDynamicFormMoreItensShowFieldConfigInterface[];
  };
  autocompleteDefaultValueOnClear?: any;
  autocompleteFilter?: (filter: string) => Observable<KoalaDynamicAutocompleteOptionsInterface[]>;
  autocompleteOptions?: BehaviorSubject<KoalaDynamicAutocompleteOptionsInterface[]>;
  autocompleteMultipleConfig?: BehaviorSubject<KoalaDynamicFormAutocompleteMultipleConfigInterface>;
  autocompleteType?: 'all' | 'onDemand';
  autocompleteAddOption?: boolean;
  valueChanges?: (value: any) => void;
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[];
  syncValidators?: ValidatorFn[],
  fileButtonConfig?: {
    icon?: string;
    text?: string;
    color?: string;
    backgroundColor?: string;
    accept?: string;
  }
  dynamicFormConfig?: KoalaDynamicFormConfigInterface;
  customMasc?: string;
  customMascSuffix?: string;
  customMascPrefix?: string;
  customMascThousandSeparator?: string;
}
