import { BehaviorSubject } from 'rxjs';
import { KoalaDynamicSetValueInterface } from './koala.dynamic-set-value.interface';
import { KoalaDynamicFormShowFieldInterface } from './koala.dynamic-form-show-field.interface';
import { FormGroup } from '@angular/forms';
import { KoalaDynamicFormFieldInterface } from './koala.dynamic-form-field.interface';

export interface KoalaDynamicFormConfigInterface {
	form: FormGroup;
	formConfig: KoalaDynamicFormFieldInterface[];
	setValues?: BehaviorSubject<KoalaDynamicSetValueInterface[]>;
	showFields?: BehaviorSubject<KoalaDynamicFormShowFieldInterface[]>;
}
