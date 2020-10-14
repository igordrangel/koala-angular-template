import { Injectable } from '@angular/core';
import { DynamicFormTypeFieldEnum } from '../../components/form/dynamic-form/enums/dynamic-form-type-field.enum';
import { KoalaStringHelper } from 'tskoala-helpers/dist/string/koala-string.helper';
import { FormArray, FormGroup } from '@angular/forms';
import { KoalaDynamicSetValueInterface } from '../../components/form/dynamic-form/interfaces/koala.dynamic-set-value.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { KoalaDynamicAutocompleteOptionsInterface } from '../../components/form/dynamic-form/interfaces/koala.dynamic-autocomplete-options.interface';
import { KoalaObjectHelper } from 'tskoala-helpers/dist/object/koala-object.helper';
import { KoalaDynamicFormShowFieldInterface } from '../../components/form/dynamic-form/interfaces/koala.dynamic-form-show-field.interface';

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
      } else if (control.get('type').value === DynamicFormTypeFieldEnum.autocomplete) {
        value = control.get('autocompleteSelectedValue').value;
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
          if (indexNameByValue.indexOf(' > ') >= 0) {
            value = this.getValueByStringPath(indexNameByValue, item);
          } else if (indexNameByValue) {
            value = item[indexNameByValue];
          }
          options.push({
            name: KoalaObjectHelper.toString(
              [item],
              nameConfig.propsByName,
              ';',
	            (nameConfig.delimiter ?? ' ')
            ),
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
		show: boolean
	) {
		const fields: KoalaDynamicFormShowFieldInterface[] = [];
		names.forEach(name => {
			fields.push({
				name,
				show
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
