import { DynamicFormTypeFieldEnum } from '../enums/dynamic-form-type-field.enum';
import { FloatLabelType, MatFormFieldAppearance } from '@angular/material/form-field';
import { BehaviorSubject, Observable } from 'rxjs';
import { AsyncValidatorFn, FormGroup } from '@angular/forms';
import { KoalaDynamicSetValueInterface } from './koala.dynamic-set-value.interface';
import { KoalaDynamicAutocompleteOptionsInterface } from './koala.dynamic-autocomplete-options.interface';

export interface KoalaDynamicFormFieldInterface {
  label?: string;
  name: string;
  required?: boolean;
  disabled?: boolean;
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
  moreItemsConfig?: {
    form: FormGroup;
    formConfig: KoalaDynamicFormFieldInterface[];
    setValues?: BehaviorSubject<BehaviorSubject<KoalaDynamicSetValueInterface[]>[]>;
  };
  autocompleteFilter?: (filter: string) => Observable<KoalaDynamicAutocompleteOptionsInterface[]>;
  autocompleteOptions?: BehaviorSubject<KoalaDynamicAutocompleteOptionsInterface[]>;
  autocompleteType?: 'all' | 'onDemand';
  valueChanges?: (value: any) => void;
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[];
}
