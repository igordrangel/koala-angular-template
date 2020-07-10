import { Injectable } from '@angular/core';
import { DynamicFormTypeFieldEnum } from '../../components/form/dynamic-form/enums/dynamic-form-type-field.enum';
import { KoalaStringHelper } from 'tskoala-helpers/dist/string/koala-string.helper';
import { FormArray, FormGroup } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class KoalaDynamicFormService {

  public emitData(form: FormGroup) {
    const data = {};
    const formArray = form.get('formData') as FormArray;
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
