import { Injectable } from '@angular/core';
import { DynamicFormTypeFieldEnum } from './enums/dynamic-form-type-field.enum';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { KoalaDynamicSetValueInterface } from './interfaces/koala.dynamic-set-value.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { KoalaDynamicAutocompleteOptionsInterface } from './interfaces/koala.dynamic-autocomplete-options.interface';
import { KoalaDynamicFormShowFieldInterface } from './interfaces/koala.dynamic-form-show-field.interface';
import { KoalaDynamicFormConfigInterface } from './interfaces/koala.dynamic-form-config.interface';
import { DynamicFormBuilder } from "./builder/dynamic-form.builder";
import { koala } from "@koalarx/utils";
import { DateMinValidator } from "./validators/date-min.validator";
import { DateMaxValidator } from "./validators/date-max.validator";
import { DeviceDetectorService } from "ngx-device-detector";
import { unmaskCoin } from "@koalarx/utils/operators/string";

export type KoalaDynamicFormValidatorType = 'required' | 'min' | 'max';

@Injectable({providedIn: "any"})
export class KoalaDynamicFormService {

  constructor(
    protected fb: UntypedFormBuilder,
    protected deviceService: DeviceDetectorService) {
  }

  public build() {
    return new DynamicFormBuilder(this.fb, this.deviceService);
  }

  public updateValidator(formGroup: UntypedFormGroup, name: string, type: KoalaDynamicFormValidatorType, value: boolean | number | string) {
    if (type === 'required' && typeof value !== 'boolean') {
      throw new Error(`Type required cannot be a ${typeof value}`);
    } else if ((type === 'min' || type === 'max') && typeof value === "boolean") {
      throw new Error(`Type ${type} cannot be a boolean`);
    }

    const formArray = formGroup.get('formData') as UntypedFormArray;
    const control = formArray.controls.find(control => control.get('name').value === name);

    if (control) {
      const currentMin = control.get('min').value;
      const currentMax = control.get('max').value;
      const validators = [];

      control.get('value').clearValidators();
      control.get('value').setErrors(null);

      if (type === "required" && value) {
        validators.push(Validators.required);
        control.get('value').setErrors({required: true});
      }
      if ((type === "min" || currentMin)) {
        if (typeof value === "number") {
          validators.push(Validators.min((type === "min" ? value : currentMin)));
          control.get('value').setErrors({min: true});
        }
        else if (typeof value === "string") {
          validators.push(DateMinValidator((type === "min" ? value : currentMin)));
          control.get('value').setErrors({dateMin: true});
        }
      }
      if ((type === "max" || currentMax)) {
        if (typeof value === "number") {
          validators.push(Validators.max((type === "max" ? value : currentMax)));
          control.get('value').setErrors({max: true});
        }
        else if (typeof value === "string") {
          validators.push(DateMaxValidator((type === "max" ? value : currentMax)));
          control.get('value').setErrors({dateMax: true});
        }
      }

      if (type === "required") {
        control.get('required').setValue(value);
      } else if (type === "min") {
        control.get('min').setValue(value);
      } else if (type === "max") {
        control.get('max').setValue(value);
      }
      control.get('value').setValidators(validators);
      control.get('value').updateValueAndValidity();
    }
  }

  public disableFields(formGroup: UntypedFormGroup, disabled: boolean, fields: string[]) {
    const formArray = formGroup.get('formData') as UntypedFormArray;

    fields.forEach(field => {
      const controlValue = formArray.controls.find(control => field === control.get('name').value)?.get('value');

      if (controlValue && disabled) {
        controlValue.disable();
      } else if (controlValue && !disabled) {
        controlValue.enable();
      }

      const controlDisabled = formArray.controls.find(control => field === control.get('name').value)?.get('disabled');
      controlDisabled.setValue(disabled);
    });
  }

  public emitData(form: UntypedFormGroup) {
    const data = {};
    const formArray = form.get('formData') as UntypedFormArray;
    formArray?.controls.forEach(control => {
      if (control.get('show').value.getValue() !== false) {
        let value: any = control.get('value').value;
        if (control.get('type').value === DynamicFormTypeFieldEnum.valueList) {
          if (value === null || value === undefined) {
            value = '';
          }
          value = koala(value).string().split().getValue();
        } else if (control.get('type').value === DynamicFormTypeFieldEnum.moreItems) {
          const moreItems = control.get('moreItemsConfig').value as { form: UntypedFormGroup }[];
          value = [];
          moreItems.forEach(item => {
            value.push(this.emitData(item.form));
          });
        } else if (control.get('type').value === DynamicFormTypeFieldEnum.autocomplete) {
          if (control.get('multiple').value) {
            const options = control.get('autocompleteSelectedValue').value as KoalaDynamicAutocompleteOptionsInterface[];
            value = options?.map(item => item?.value);
          } else {
            value = (control.get('autocompleteSelectedValue').value?.value ?
                     control.get('autocompleteSelectedValue').value.value :
                     control.get('autocompleteSelectedValue').value
            );
          }
        } else if (control.get('type').value === DynamicFormTypeFieldEnum.dynamicForm) {
          const dynamicFormConfig = control.get('dynamicFormConfig').value as BehaviorSubject<KoalaDynamicFormConfigInterface>;
          value = this.emitData(dynamicFormConfig.getValue().form);
        } else if (control.get('type').value === DynamicFormTypeFieldEnum.number) {
          value = parseInt(value);
        } else if ((
          control.get('type').value === DynamicFormTypeFieldEnum.float ||
          control.get('type').value === DynamicFormTypeFieldEnum.percent
        ) && typeof value === "string") {
          value = parseFloat(value.replace(/,/g, '.'));
        } else if (
          control.get('type').value === DynamicFormTypeFieldEnum.coin &&
          typeof value === "string"
        ) {
          value = unmaskCoin(value);
        }
        data[control.get('name').value] = value;
      }
    });

    return data;
  }

  public resetForm(form: UntypedFormGroup) {
    const formArray = form.get('formData') as UntypedFormArray;
    formArray.controls.forEach(control => {
      if (control.get('type').value === DynamicFormTypeFieldEnum.moreItems) {
        control.get('moreItemsConfig').setValue([]);
      } else {
        control.get('value').reset();
      }
    });
  }

  public setValuesInMoreItemsForm(
    subject: BehaviorSubject<BehaviorSubject<KoalaDynamicSetValueInterface[]>[]>,
    values: KoalaDynamicSetValueInterface[][]
  ) {
    const valuesMoreItems = [];
    values.forEach(itemValue => {
      valuesMoreItems.push(new BehaviorSubject<KoalaDynamicSetValueInterface[]>(itemValue));
    });
    subject.next(valuesMoreItems);
  }

  public autocompleteFilterOnServer(
    request: () => Promise<any[]>,
    nameConfig: {
      propsByName: string[];
      delimiter: string;
    },
    indexNameByValue?: string
  ) {
    return new Observable<KoalaDynamicAutocompleteOptionsInterface[]>(observe => {
      request().then(response => {
        const options: KoalaDynamicAutocompleteOptionsInterface[] = [];
        response.forEach(item => {
          let value = '';
          if (indexNameByValue?.indexOf(' > ') >= 0) {
            value = this.getValueByStringPath(indexNameByValue, item);
          } else if (indexNameByValue) {
            value = item[indexNameByValue];
          } else {
            value = item;
          }
          options.push({
            name: koala(item).object().toString(
              nameConfig.propsByName,
              (nameConfig.delimiter ?? ' ')
            ).getValue(),
            value
          });
        });
        observe.next(options);
      });
    });
  }

  public showFields(
    subject: BehaviorSubject<KoalaDynamicFormShowFieldInterface[]>,
    names: string[],
    show: boolean,
    clearCurrentValue = false
  ) {
    const fields: KoalaDynamicFormShowFieldInterface[] = [];
    names.forEach(name => {
      fields.push({
        name,
        show,
        clearCurrentValue
      });
    });
    subject.next(fields);
  }

  private getValueByStringPath(indexNameByValue: string, item: any) {
    let value;
    const partsIndex = indexNameByValue.split(' > ');
    let partIndex = 0;
    do {
      if (!value) {
        value = item[partsIndex[partIndex]];
      } else {
        value = value[partsIndex[partIndex]];
      }
      partIndex++;
    } while (partIndex < partsIndex.length);

    return value;
  }
}
