import { Injectable } from '@angular/core';
import { DynamicFormTypeFieldEnum } from '../../components/form/dynamic-form/enums/dynamic-form-type-field.enum';
import { KoalaStringHelper } from 'tskoala-helpers/dist/string/koala-string.helper';
import { FormArray, FormGroup } from '@angular/forms';
import { KoalaDynamicSetValueInterface } from '../../components/form/dynamic-form/interfaces/koala.dynamic-set-value.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class KoalaDynamicFormService {
  
  public emitData(form: FormGroup) {
    const data = {};
    const formArray = form.get('formData') as FormArray;
    formArray?.controls.forEach(control => {
      let value: any = control.get('value').value;
      if (control.get('type').value === DynamicFormTypeFieldEnum.valueList) {
        value = KoalaStringHelper.split(value);
      } else if (control.get('type').value === DynamicFormTypeFieldEnum.moreItems) {
        const moreItems = control.get('moreItemsConfig').value as { form: FormGroup }[];
        value = [];
        moreItems.forEach(item => {
          value.push(this.emitData(item.form));
        });
      }
      data[control.get('name').value] = value;
    });
    
    return data;
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
}
