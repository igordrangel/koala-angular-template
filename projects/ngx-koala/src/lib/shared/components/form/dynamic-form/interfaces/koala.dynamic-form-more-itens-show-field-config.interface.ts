import { KoalaDynamicFormConfigInterface } from './koala.dynamic-form-config.interface';

export interface KoalaDynamicFormMoreItensShowFieldConfigInterface {
	nameField: string;
	fieldsToShow: string[];
	fnShow: (value) => boolean;
	dynamicFormConfig?: (value) => KoalaDynamicFormConfigInterface;
}
