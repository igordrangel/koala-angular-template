import { Injectable } from '@angular/core';
import { DynamicFormTypeFieldEnum } from '../../components/form/dynamic-form/enums/dynamic-form-type-field.enum';
import { KoalaStringHelper } from 'tskoala-helpers/dist/string/koala-string.helper';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { KoalaDynamicSetValueInterface } from '../../components/form/dynamic-form/interfaces/koala.dynamic-set-value.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { KoalaDynamicAutocompleteOptionsInterface } from '../../components/form/dynamic-form/interfaces/koala.dynamic-autocomplete-options.interface';
import { KoalaObjectHelper } from 'tskoala-helpers/dist/object/koala-object.helper';
import { KoalaDynamicFormShowFieldInterface } from '../../components/form/dynamic-form/interfaces/koala.dynamic-form-show-field.interface';
import { KoalaDynamicFormConfigInterface } from '../../components/form/dynamic-form/interfaces/koala.dynamic-form-config.interface';
import { DynamicFormBuilder } from "./builder/dynamic-form.builder";
import { koala } from "koala-utils";

@Injectable({providedIn: "any"})
export class KoalaDynamicFormService {

  constructor(protected fb: FormBuilder) {
  }

  public build() {
    return new DynamicFormBuilder(this.fb);
  }

  public emitData(form: FormGroup) {
    const data = {};
    const formArray = form.get('formData') as FormArray;
    formArray?.controls.forEach(control => {
	    if (control.get('show').value.getValue() !== false) {
		    let value: any = control.get('value').value;
		    if (control.get('type').value === DynamicFormTypeFieldEnum.valueList) {
			    if (value === null || value === undefined) {
				    value = '';
			    }
			    value = KoalaStringHelper.split(value);
		    } else if (control.get('type').value === DynamicFormTypeFieldEnum.moreItems) {
			    const moreItems = control.get('moreItemsConfig').value as { form: FormGroup }[];
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
        } else if (
          control.get('type').value === DynamicFormTypeFieldEnum.float ||
          control.get('type').value === DynamicFormTypeFieldEnum.percent
        ) {
          value = parseFloat(value.replace(/,/g, '.'));
        } else if (control.get('type').value === DynamicFormTypeFieldEnum.coin) {
          value = koala(value).string().unmaskCoin().getValue();
        }
		    data[control.get('name').value] = value;
	    }
    });

    return data;
  }

  public resetForm(form: FormGroup) {
    const formArray = form.get('formData') as FormArray;
    formArray.controls.forEach(control => {
      control.get('value').reset();
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
