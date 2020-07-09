import { Injectable } from '@angular/core';
import { DynamicFormTypeFieldEnum } from './enums/dynamic-form-type-field.enum';
import { KoalaStringHelper } from 'tskoala-helpers/dist/string/koala-string.helper';
import { FormArray } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class DynamicFormService {

  public emitData(formArray: FormArray) {
    const data = {};
    formArray?.controls.forEach(control => {
      let value: any = control.get('value').value;
      if (control.get('type').value === DynamicFormTypeFieldEnum.valueList) {
        value = KoalaStringHelper.split(value);
      }
      data[control.get('name').value] = value;
    });

    return data;
  }
}
