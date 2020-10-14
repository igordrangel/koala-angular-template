import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KoalaDynamicFormFieldInterface } from './interfaces/koala.dynamic-form-field.interface';
import { DynamicFormTypeFieldEnum } from './enums/dynamic-form-type-field.enum';
import { CpfValidator } from './validators/cpf.validator';
import { CnpjValidator } from './validators/cnpj.validator';
import { Component, Input, OnInit } from '@angular/core';
import { FormAbstract } from '../../../../core/form.abstract';
import { debounceTime } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { KoalaDynamicSetValueInterface } from './interfaces/koala.dynamic-set-value.interface';
import { AutocompleteSelectedValidator } from './validators/autocomplete-selected.validator';
import { KoalaDynamicAutocompleteOptionsInterface } from './interfaces/koala.dynamic-autocomplete-options.interface';
import { KoalaDynamicFormShowFieldInterface } from './interfaces/koala.dynamic-form-show-field.interface';

@Component({
	selector: 'koala-dynamic-form',
	templateUrl: 'dynamic-form.component.html',
	styleUrls: ['dynamic-form.component.css']
})
export class DynamicFormComponent extends FormAbstract implements OnInit {
	@Input() form: FormGroup;
	@Input() formConfig: KoalaDynamicFormFieldInterface[];
	@Input() showFields: BehaviorSubject<KoalaDynamicFormShowFieldInterface[]>;
	@Input() setValues: BehaviorSubject<KoalaDynamicSetValueInterface[]>;
	public controls: FormArray;
	public typeField = DynamicFormTypeFieldEnum;
	
	constructor(
		private fb: FormBuilder
	) {
		super(() => this.form);
	}
	
	ngOnInit() {
		if (!this.form.get('formData')) {
			this.form.addControl('formData', this.fb.array([]));
		}
		this.controls = this.form.get('formData') as FormArray;
		this.formConfig?.forEach((config, indexConfig) => {
			const newFormGroup = this.newControl(config);
			if (config.asyncValidators) {
				newFormGroup.get('value').setAsyncValidators(config.asyncValidators);
			}
			if (config.valueChanges || config.type === DynamicFormTypeFieldEnum.autocomplete) {
				if (config.type === DynamicFormTypeFieldEnum.autocomplete) {
					const autocompleteOptionsSubject = newFormGroup.get('autocompleteOptions').value as BehaviorSubject<KoalaDynamicAutocompleteOptionsInterface[]>;
					if (autocompleteOptionsSubject) {
						autocompleteOptionsSubject.subscribe(options => newFormGroup.get('autocompleteOptionsFiltered').setValue(options));
					}
				}
				newFormGroup.get('value')
				            .valueChanges
				            .pipe(debounceTime(300))
				            .subscribe(value => {
					            if (config.type === DynamicFormTypeFieldEnum.autocomplete) {
						            if (
							            value &&
							            value.hasOwnProperty('value') &&
							            value.hasOwnProperty('name') &&
							            Object.keys(value).length === 2
						            ) {
							            newFormGroup.get('autocompleteSelectedValue').setValue(value.value);
						            }
						            if (config.autocompleteType === 'all') {
							            const autocompleteOptionsSubject = newFormGroup.get('autocompleteOptions').value as BehaviorSubject<KoalaDynamicAutocompleteOptionsInterface[]>;
							            newFormGroup.get('autocompleteOptionsFiltered').setValue(this.autocompleteFilter(
								            autocompleteOptionsSubject.value,
								            value
							            ));
						            } else {
							            const loader = newFormGroup.get('autocompleteLoading').value as BehaviorSubject<boolean>;
							            loader.next(true);
							            config.autocompleteFilter(value).subscribe(options => {
								            newFormGroup.get('autocompleteOptionsFiltered').setValue(options);
								            loader.next(false);
							            });
						            }
					            }
					            if (config.valueChanges) {
						            if (config.type === DynamicFormTypeFieldEnum.autocomplete) {
							            if (newFormGroup.get('autocompleteSelectedValue').value) {
								            config.valueChanges(newFormGroup.get('autocompleteSelectedValue').value);
							            }
						            } else {
							            config.valueChanges(value);
						            }
					            }
				            });
			}
			this.controls.push(newFormGroup);
			if (config.moreItemsConfig) {
				if (config.moreItemsMinItems > 0) {
					for (let min = 0; min < config.moreItemsMinItems; min++) {
						if (min <= config.moreItemsMaxItems) {
							this.addMoreItem(indexConfig);
						}
					}
				}
				if (config.moreItemsConfig.setValues) {
					config.moreItemsConfig.setValues.subscribe(values => {
						if (values.length > 0) {
							values.forEach((itemValue, indexValue) => {
								if (!this.controls.controls[indexConfig].get('moreItemsConfig').value[indexValue]) {
									this.addMoreItem(indexConfig);
								}
								setTimeout(() => {
									this.setValuesOnFields(itemValue, this.controls.controls[indexConfig].get('moreItemsConfig').value[indexValue].form);
								}, 301);
							});
						}
					});
				}
			}
		});
		if (this.setValues) {
			this.setValuesOnFields(this.setValues, this.form);
		}
		if (this.showFields) {
			this.changeVisibilityFields(this.showFields, this.form);
		}
	}
	
	public passwordView(index: number) {
		const control = this.controls?.controls[index];
		const hidePassword = !control?.get('hidePassword').value;
		control?.get('hidePassword').setValue(hidePassword);
		control?.get('type').setValue(hidePassword ?
			DynamicFormTypeFieldEnum.password :
			DynamicFormTypeFieldEnum.text
		);
	}
	
	public addMoreItem(propIndex: number) {
		if (this.controls.controls[propIndex].get('moreItemsConfig').value.length < this.controls.controls[propIndex].get('moreItemsMaxItems').value) {
			this.controls.controls[propIndex].get('moreItemsConfig').value.push({
				form: this.fb.group({}),
				formConfig: this.formConfig[propIndex].moreItemsConfig.formConfig
			});
			this.controls.controls[propIndex].get('moreItemsExpanded').setValue(
				this.controls.controls[propIndex].get('moreItemsConfig').value.length - 1
			);
		}
	}
	
	public removeMoreItem(propIndex: number, removeIndex) {
		const expandedItemIndex = removeIndex - 1;
		this.controls.controls[propIndex].get('moreItemsConfig').value.splice(removeIndex, 1);
		setTimeout(() => {
			this.controls.controls[propIndex].get('moreItemsExpanded').setValue((expandedItemIndex < 0) ? 0 : expandedItemIndex);
		}, 50);
	}
	
	public clearAutocomplete(propIndex: number) {
		this.controls.controls[propIndex].get('autocompleteSelectedValue').setValue(this.formConfig[propIndex].autocompleteDefaultValueOnClear ?? null);
		this.controls.controls[propIndex].get('value').setValue(this.formConfig[propIndex].autocompleteDefaultValueOnClear ?? null);
	}
	
	public display(option?: KoalaDynamicAutocompleteOptionsInterface): string | undefined {
		return option ? option.name : undefined;
	}
	
	private newControl(config: KoalaDynamicFormFieldInterface): FormGroup {
		const validators = [];
		let value: any = config.value ?? '';
		if (config.required) {
			validators.push(Validators.required);
		}
		if (config.type === DynamicFormTypeFieldEnum.cpf) {
			validators.push(CpfValidator);
		} else if (config.type === DynamicFormTypeFieldEnum.cnpj) {
			validators.push(CnpjValidator);
		} else if (config.type === DynamicFormTypeFieldEnum.email) {
			validators.push(Validators.email);
		} else if (
			config.required &&
			config.type === DynamicFormTypeFieldEnum.autocomplete
		) {
			validators.push(AutocompleteSelectedValidator);
		} else if (config.type === DynamicFormTypeFieldEnum.checkbox) {
			value = config.value ?? false;
		}
		
		return this.fb.group({
			show: [config.show ?? true],
			label: [config.label],
			name: [config.name],
			type: [config.type],
			fileButtonConfig: [{
				icon: config?.fileButtonConfig?.icon ?? 'attach_file',
				text: config?.fileButtonConfig?.text ?? 'Clique para anexar arquivos',
				backgroundColor: config?.fileButtonConfig?.backgroundColor ?? 'white',
				color: config?.fileButtonConfig?.color ?? 'blue',
				accept: config?.fileButtonConfig?.accept ?? '*'
			}],
			appearance: [config.appearance],
			floatLabel: [config.floatLabel],
			placeholder: [config.placeholder],
			class: [config.class],
			fieldClass: [config.fieldClass],
			textHint: [config.textHint],
			required: [config.required ?? false],
			disabled: [config.disabled ?? false],
			focus: [config.focus ?? false],
			multiple: [config.multiple ?? false],
			opcoesSelect: [config.opcoesSelect ?? []],
			hidePassword: config.type === DynamicFormTypeFieldEnum.password ? true : null,
			moreItemsButtonIconAddlabel: [config.moreItemsButtonIconAddlabel],
			moreItemsMinItems: [config.moreItemsMinItems ?? 0],
			moreItemsMaxItems: [config.moreItemsMaxItems ?? 100],
			moreItemsIcon: [config.moreItemsIcon],
			moreItemsExpanded: [''],
			moreItemsConfig: [[]],
			autocompleteLoading: [new BehaviorSubject<boolean>(false)],
			autocompleteOptions: [config.autocompleteOptions],
			autocompleteOptionsFiltered: [[]],
			autocompleteSelectedValue: [value?.value ?? ''],
			textLogs: [config?.textObs],
			value: [value, validators]
		});
	}
	
	private setValuesOnFields(subject: BehaviorSubject<KoalaDynamicSetValueInterface[]>, form: FormGroup) {
		subject.subscribe(item => {
			if (item) {
				const formArray = form.get('formData') as FormArray;
				for (const prop of item.values()) {
					for (const control of formArray.controls.values()) {
						if (control.get('name').value === prop.name) {
							control.get('value').setValue(prop.value);
							break;
						}
					}
				}
			}
		});
	}
	
	private changeVisibilityFields(subject: BehaviorSubject<KoalaDynamicFormShowFieldInterface[]>, form: FormGroup) {
		subject.subscribe(item => {
			if (item) {
				const formArray = form.get('formData') as FormArray;
				for (const [index, prop] of item.entries()) {
					for (const control of formArray.controls.values()) {
						if (control.get('name').value === prop.name) {
							control.get('show').setValue(prop.show);
							if (prop.show) {
								const validators = [];
								const config: any = this.formConfig[index].value ?? '';
								if (config.required) {
									validators.push(Validators.required);
								}
								if (config.type === DynamicFormTypeFieldEnum.cpf) {
									validators.push(CpfValidator);
								} else if (config.type === DynamicFormTypeFieldEnum.cnpj) {
									validators.push(CnpjValidator);
								} else if (config.type === DynamicFormTypeFieldEnum.email) {
									validators.push(Validators.email);
								} else if (
									config.required &&
									config.type === DynamicFormTypeFieldEnum.autocomplete
								) {
									validators.push(AutocompleteSelectedValidator);
								}
								control.get('value').setValidators(validators);
							} else {
								control.get('value').setValue(null);
								control.get('value').clearValidators();
								control.get('value').clearAsyncValidators();
								control.setErrors(null);
							}
							break;
						}
					}
				}
			}
		});
	}
	
	private autocompleteFilter(arr: KoalaDynamicAutocompleteOptionsInterface[], value: string): KoalaDynamicAutocompleteOptionsInterface[] {
		return arr.filter(filter => {
			if (typeof value === 'string') {
				if (filter) {
					let find = true;
					value.toLowerCase()
					     .split(' ')
					     .forEach(part => {
						     if (filter.name.toLowerCase().indexOf(part) < 0) {
							     find = false;
							     return false;
						     }
					     });
					
					return find;
				}
			} else {
				return true;
			}
		});
	}
}
