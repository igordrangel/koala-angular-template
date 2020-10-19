export interface KoalaDynamicFormMoreItensShowFieldConfigInterface {
	nameField: string;
	fieldsToShow: string[];
	fnShow: (value) => boolean;
}
