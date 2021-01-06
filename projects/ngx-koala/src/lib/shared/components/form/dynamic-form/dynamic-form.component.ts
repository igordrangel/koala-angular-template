import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KoalaDynamicFormFieldInterface } from './interfaces/koala.dynamic-form-field.interface';
import { DynamicFormTypeFieldEnum } from './enums/dynamic-form-type-field.enum';
import { CpfValidator } from './validators/cpf.validator';
import { CnpjValidator } from './validators/cnpj.validator';
import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormAbstract } from '../../../../core/form.abstract';
import { debounceTime } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { KoalaDynamicSetValueInterface } from './interfaces/koala.dynamic-set-value.interface';
import { AutocompleteSelectedValidator } from './validators/autocomplete-selected.validator';
import { KoalaDynamicAutocompleteOptionsInterface } from './interfaces/koala.dynamic-autocomplete-options.interface';
import { KoalaDynamicFormShowFieldInterface } from './interfaces/koala.dynamic-form-show-field.interface';
import { KoalaDynamicFormService } from '../../../services/dynamic-forms/koala.dynamic-form.service';
import { KoalaDynamicFormMoreItensShowFieldConfigInterface } from './interfaces/koala.dynamic-form-more-itens-show-field-config.interface';
import { KoalaArrayHelper } from 'tskoala-helpers/dist/array/koala-array.helper';
import { ThemePalette } from '@angular/material/core';
import { KoalaDynamicFormAutocompleteMultipleConfigInterface } from './interfaces/koala.dynamic-form-autocomplete-multiple-config.interface';
import { KoalaDynamicFormConfigInterface } from './interfaces/koala.dynamic-form-config.interface';
import { KoalaDelayHelper } from 'tskoala-helpers/dist/delay/koala-delay.helper';

@Component({
	selector: 'koala-dynamic-form',
	templateUrl: 'dynamic-form.component.html',
	styleUrls: ['dynamic-form.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent extends FormAbstract implements OnInit {
	@Input() form: FormGroup;
	@Input() formConfig: KoalaDynamicFormFieldInterface[];
	@Input() showFields: BehaviorSubject<KoalaDynamicFormShowFieldInterface[]>;
	@Input() showFieldsMoreItensConfig: KoalaDynamicFormMoreItensShowFieldConfigInterface[];
	@Input() setValues: BehaviorSubject<KoalaDynamicSetValueInterface[]>;
	public controls: FormArray;
	public typeField = DynamicFormTypeFieldEnum;
	public hoursAndMinutesMask = '00:000';

	@ViewChild('autocompleteInput') autocompleteInput: ElementRef<HTMLInputElement>;

	constructor(
		private fb: FormBuilder,
		private dynamicFormService: KoalaDynamicFormService
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
			if (config.type === DynamicFormTypeFieldEnum.dynamicForm) {
				const formGroupDynamicFormsSubject = newFormGroup.get('dynamicFormConfig').value as BehaviorSubject<KoalaDynamicFormConfigInterface>;
				formGroupDynamicFormsSubject.subscribe(formGroupConfig => {
					if (formGroupConfig) {
						formGroupConfig.form.valueChanges.subscribe(() => {
							if (formGroupConfig.form.valid && (config.valueChanges || this.showFieldsMoreItensConfig)) {
								const value = this.dynamicFormService.emitData(formGroupConfig.form);
								newFormGroup.get('value').setValue(value);
							}
						});
					}
				});
			}
			if (
				config.valueChanges ||
				config.type === DynamicFormTypeFieldEnum.autocomplete ||
				config.type === DynamicFormTypeFieldEnum.dynamicForm ||
				this.showFieldsMoreItensConfig
			) {
				if (config.type === DynamicFormTypeFieldEnum.autocomplete) {
					const autocompleteOptionsSubject = newFormGroup.get('autocompleteOptions').value as BehaviorSubject<KoalaDynamicAutocompleteOptionsInterface[]>;
					if (autocompleteOptionsSubject) {
						autocompleteOptionsSubject.subscribe(options => newFormGroup.get('autocompleteOptionsFiltered').value.next(options));
					}
				}
				newFormGroup.get('value')
				            .valueChanges
				            .pipe(debounceTime(300))
				            .subscribe(async value => {
					            await this.setConfigDynamicForm(newFormGroup);
					            if (config.type === DynamicFormTypeFieldEnum.autocomplete) {
						            if (
							            value && (
								            value.hasOwnProperty('value') &&
								            value.hasOwnProperty('name') &&
								            Object.keys(value).length === 2
							            ) || (
								            Array.isArray(value) &&
								            value.length > 0 &&
								            newFormGroup.get('multiple').value
							            )) {
							            if (newFormGroup.get('multiple').value) {
								            if (Array.isArray(value)) {
									            for (const itemValue of value.values()) {
										            newFormGroup.get('autocompleteSelectedValue').value.push(itemValue);
									            }
								            } else {
									            newFormGroup.get('autocompleteSelectedValue').value.push(value);
								            }
								            if (this.autocompleteInput?.nativeElement) {
									            this.autocompleteInput.nativeElement.value = '';
								            }
							            } else {
								            newFormGroup.get('autocompleteSelectedValue').setValue(value);
							            }
						            } else if (!newFormGroup.get('multiple').value) {
							            newFormGroup.get('autocompleteSelectedValue').setValue(
								            KoalaArrayHelper.filter<KoalaDynamicFormFieldInterface>(
									            this.formConfig,
									            newFormGroup.get('name').value,
									            'name'
								            )[0].autocompleteDefaultValueOnClear ?? null);
						            }
						            if (config.autocompleteType === 'all') {
							            const autocompleteOptionsSubject = newFormGroup.get('autocompleteOptions').value as BehaviorSubject<KoalaDynamicAutocompleteOptionsInterface[]>;
							            newFormGroup.get('autocompleteOptionsFiltered').value.next(this.autocompleteFilter(
								            autocompleteOptionsSubject.value,
								            value
							            ));
						            } else {
							            const loader = newFormGroup.get('autocompleteLoading').value as BehaviorSubject<boolean>;
							            loader.next(true);
							            config.autocompleteFilter(value).subscribe(options => {
								            newFormGroup.get('autocompleteOptionsFiltered').value.next(options);
								            loader.next(false);
							            });
						            }
					            }
					            if (config.valueChanges) {
						            if (config.type === DynamicFormTypeFieldEnum.autocomplete) {
							            config.valueChanges((newFormGroup.get('multiple').value ?
									            newFormGroup.get('autocompleteSelectedValue').value.map(item => item.value) :
									            newFormGroup.get('autocompleteSelectedValue').value?.value
							            ));
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
					config.moreItemsConfig
					      .setValues
					      .subscribe(async values => {
						      if (values.length > 0) {
							      values.forEach((itemValue, indexValue) => {
								      if (!this.controls.controls[indexConfig].get('moreItemsConfig').value[indexValue]) {
									      this.addMoreItem(indexConfig);
								      }
								      setTimeout(() => {
									      this.setValuesOnFields(
										      itemValue,
										      this.controls.controls[indexConfig].get('moreItemsConfig').value[indexValue].form
									      );
								      }, 300);
							      });
						      }
					      });
				}
			}
		});
		if (this.showFields) {
			this.changeVisibilityFields(this.showFields, this.form);
		}
		if (this.setValues) {
			this.setValuesOnFields(this.setValues, this.form);
		}
	}

	public hoursAndMinutesApplyMask(index: number, event: KeyboardEvent) {
		const control = this.controls?.controls[index];
		const type = control?.get('type').value as DynamicFormTypeFieldEnum;
		if (type === DynamicFormTypeFieldEnum.hoursAndMinutes) {
			const value = control?.get('value').value;
			if (event.key == 'Backspace' && value.length < 6) {
				this.hoursAndMinutesMask = '00:000';
			} else if (event.key != 'Backspace' && value.length >= 6) {
				this.hoursAndMinutesMask = '000:00';
			}
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
				formConfig: this.formConfig[propIndex].moreItemsConfig.formConfig,
				showFields: new BehaviorSubject<BehaviorSubject<KoalaDynamicSetValueInterface[]>[]>([]),
				showFieldsMoreItensConfig: this.formConfig[propIndex].moreItemsConfig.showFieldsConfig
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
		if (this.controls.controls[propIndex].get('multiple').value) {
			this.controls.controls[propIndex].get('autocompleteSelectedValue').setValue([]);
			this.controls.controls[propIndex].get('value').setValue(null);
		} else {
			this.controls.controls[propIndex].get('autocompleteSelectedValue').setValue(this.formConfig[propIndex].autocompleteDefaultValueOnClear ?? null);
			this.controls.controls[propIndex].get('value').setValue(this.formConfig[propIndex].autocompleteDefaultValueOnClear ?? null);
		}
	}

	public display(option?: KoalaDynamicAutocompleteOptionsInterface): string | undefined {
		return option ? option.name : undefined;
	}

	public removeOptionOnAutocomplete(propIndex: number, option: KoalaDynamicAutocompleteOptionsInterface) {
		const value = this.controls.controls[propIndex].get('autocompleteSelectedValue').value.filter(item => item !== option) as KoalaDynamicAutocompleteOptionsInterface[];
		this.controls.controls[propIndex].get('autocompleteSelectedValue').setValue(value);
		if (value.length === 0) {
			this.controls.controls[propIndex].get('autocompleteSelectedValue').setValue([]);
			this.controls.controls[propIndex].get('value').setValue(null);
		} else if (this.formConfig[propIndex].valueChanges) {
			this.formConfig[propIndex].valueChanges(value.map(item => item.value));
		}
	}

	public getColorChip(config: KoalaDynamicFormAutocompleteMultipleConfigInterface): ThemePalette {
		return config.color;
	}

	private newControl(config: KoalaDynamicFormFieldInterface): FormGroup {
		let validators = [];
		let value: any = config.value ?? '';
		let valueSelectedAutocomplete: KoalaDynamicAutocompleteOptionsInterface | KoalaDynamicAutocompleteOptionsInterface[] = (
			config.multiple ?
				[] :
				(config.autocompleteDefaultValueOnClear ?? null)
		);
		if (config.required === true) {
			validators.push(Validators.required);
		}
		if (config.type === DynamicFormTypeFieldEnum.cpf) {
			validators.push(CpfValidator);
		} else if (config.type === DynamicFormTypeFieldEnum.cnpj) {
			validators.push(CnpjValidator);
		} else if (config.type === DynamicFormTypeFieldEnum.email) {
			validators.push(Validators.email);
		} else if (config.type === DynamicFormTypeFieldEnum.autocomplete) {
			if (value) {
				valueSelectedAutocomplete = value;
				value = (config.multiple ? valueSelectedAutocomplete[0] : value);
			}
			if (config.required === true) {
				validators.push(AutocompleteSelectedValidator);
			}
		} else if (config.type === DynamicFormTypeFieldEnum.checkbox) {
			value = config.value ?? false;
		}

		if (
			config.type === DynamicFormTypeFieldEnum.hoursAndMinutes &&
			value.length >= 6
		) {
			this.hoursAndMinutesMask = '000:00';
		}

		if (config.dynamicFormConfig) {
			const cloneDynamicFormConfig = {} as KoalaDynamicFormConfigInterface;
			Object.assign(cloneDynamicFormConfig, config.dynamicFormConfig);
			cloneDynamicFormConfig.form = config.dynamicFormConfig.form;
			config.dynamicFormConfig = cloneDynamicFormConfig;
		}

		if (config.show !== true) {
			validators = [];
		}

		return this.fb.group({
			show: [new BehaviorSubject<boolean>(config.show ?? true)],
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
			dynamicFormConfig: [new BehaviorSubject<KoalaDynamicFormConfigInterface>(config.dynamicFormConfig)],
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
      moreItemsIconFontColor: [config.moreItemsIconFontColor],
      moreItemsIconBackgroundColor: [config.moreItemsIconBackgroundColor],
			moreItemsExpanded: [''],
			moreItemsConfig: [[]],
			autocompleteLoading: [new BehaviorSubject<boolean>(false)],
			autocompleteOptions: [config.autocompleteOptions],
			autocompleteMultipleConfig: [config.autocompleteMultipleConfig],
			autocompleteOptionsFiltered: [new BehaviorSubject<any>([])],
			autocompleteSelectedValue: [valueSelectedAutocomplete],
			textLogs: [config?.textObs],
			value: [value, validators]
		});
	}

	private setValuesOnFields(subject: BehaviorSubject<KoalaDynamicSetValueInterface[]>, form: FormGroup) {
		subject.subscribe(item => {
			if (item) {
				const formArray = form.get('formData') as FormArray;
				for (const prop of item.values()) {
					this.setValueByProp(formArray, prop);
				}
			}
		});
	}

	private changeVisibilityFields(subject: BehaviorSubject<KoalaDynamicFormShowFieldInterface[]>, form: FormGroup) {
		subject.pipe(debounceTime(5)).subscribe(item => {
			if (item) {
				const formArray = form.get('formData') as FormArray;
				for (const prop of item.values()) {
					for (const [indexControl, control] of formArray.controls.entries()) {
						if (control.get('name').value === prop.name) {
							control.get('show').value.next(prop.show);
							if (prop.show) {
								const validators = [];
								const config: KoalaDynamicFormFieldInterface = this.formConfig[indexControl] ?? null;
								if (config) {
									if (config.required === true) {
										validators.push(Validators.required);
									}
									if (config.type === DynamicFormTypeFieldEnum.cpf) {
										validators.push(CpfValidator);
									} else if (config.type === DynamicFormTypeFieldEnum.cnpj) {
										validators.push(CnpjValidator);
									} else if (config.type === DynamicFormTypeFieldEnum.email) {
										validators.push(Validators.email);
									} else if (
										config.required === true &&
										config.type === DynamicFormTypeFieldEnum.autocomplete
									) {
										validators.push(AutocompleteSelectedValidator);
									}
									control.get('value').setValidators(validators);
									if (prop.clearCurrentValue) {
										control.get('value').setValue(null);
									}
								}
							} else {
								control.get('value').clearValidators();
								control.get('value').clearAsyncValidators();
								control.setErrors(null);
								control.get('value').setValue(null);
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

	private setValueByProp(formArray: FormArray, prop: KoalaDynamicSetValueInterface) {
		if (formArray) {
			if (prop.name.indexOf(' > ') >= 0) {
				let dynamicFormSubject: BehaviorSubject<KoalaDynamicFormConfigInterface>;
				const arrPropName = prop.name.split(' > ');
				let indexPropName = 0;
				do {
					const control = formArray.controls.find(control => control.get('name').value === arrPropName[indexPropName]);
					if (indexPropName === arrPropName.length - 2) {
						dynamicFormSubject = control.get('dynamicFormConfig').value;
						const dynamicForm = dynamicFormSubject.getValue();
						if (dynamicForm.formConfig.find(fc => fc.name === arrPropName[arrPropName.length - 1])) {
							if (dynamicForm.setValues) {
								dynamicForm.setValues.next(KoalaArrayHelper.merge(
									dynamicForm.setValues.getValue(), [{
										name: arrPropName[arrPropName.length - 1],
										value: prop.value
									}]
								));
							} else {
								dynamicForm.setValues = new BehaviorSubject<KoalaDynamicSetValueInterface[]>([{
									name: arrPropName[arrPropName.length - 1],
									value: prop.value
								}]);
							}
						}
					}
					indexPropName++;
				} while (indexPropName < arrPropName.length - 1);
			} else {
				for (const control of formArray.controls.values()) {
					if (control.get('name').value === prop.name) {
						control.get('value').setValue(prop.value);
						break;
					}
				}
			}
		}
	}

	private async setConfigDynamicForm(newFormGroup: FormGroup) {
		if (this.showFieldsMoreItensConfig) {
			const value = newFormGroup.get('value').value;
			const configs = this.showFieldsMoreItensConfig
			                    .filter(config => config.nameField === newFormGroup.get('name').value)
			                    .sort(config => {
				                    if (config.fnShow(value)) {
					                    return 1;
				                    }
				                    return -1;
			                    });
			for (const config of configs) {
				if (config) {
					if (config.dynamicFormConfig && config.fnShow(value)) {
						const controlDynamicFormConfig = this.controls
						                                     .controls
						                                     .find(control =>
							                                     config.fieldsToShow.indexOf(control.get('name').value) >= 0
						                                     );
						const dynamicFormConfigSubject = controlDynamicFormConfig.get('dynamicFormConfig').value as BehaviorSubject<KoalaDynamicFormConfigInterface>;
						dynamicFormConfigSubject.next(null);
						await KoalaDelayHelper.waitFor(1);
						dynamicFormConfigSubject.next(config.dynamicFormConfig(value));
					}
					this.dynamicFormService.showFields(
						this.showFields,
						config.fieldsToShow,
						config.fnShow(value),
						config.clearCurrentValue
					);
				}
			}
		}
	}
}
