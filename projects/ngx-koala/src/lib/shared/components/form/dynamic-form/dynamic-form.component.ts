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

@Component({
	selector: 'koala-dynamic-form',
	templateUrl: 'dynamic-form.component.html',
	styleUrls: ['dynamic-form.component.css']
})
export class DynamicFormComponent extends FormAbstract implements OnInit {
	@Input() form: FormGroup;
	@Input() formConfig: KoalaDynamicFormFieldInterface[];
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
			if (config.moreItemsConfig && config.moreItemsConfig.setValues) {
				config.moreItemsConfig.setValues.subscribe(values => {
					if (values.length > 0) {
						values.forEach((itemValue, indexValue) => {
							this.addMoreItem(indexConfig);
							setTimeout(() => {
								this.setValuesOnFields(itemValue, this.controls.controls[indexConfig].get('moreItemsConfig').value[indexValue].form);
							}, 301);
						});
					}
				});
			}
			if (config.valueChanges) {
				newFormGroup.get('value')
				            .valueChanges
				            .pipe(debounceTime(300))
				            .subscribe(value => config.valueChanges(value));
			}
			this.controls.push(newFormGroup);
		});
		if (this.setValues) {
			this.setValuesOnFields(this.setValues, this.form);
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
		this.controls.controls[propIndex].get('moreItemsConfig').value.push({
			form: this.fb.group({}),
			formConfig: this.formConfig[propIndex].moreItemsConfig.formConfig
		});
		this.controls.controls[propIndex].get('moreItemsExpanded').setValue(
			this.controls.controls[propIndex].get('moreItemsConfig').value.length - 1
		);
	}
	
	public removeMoreItem(propIndex: number, removeIndex) {
		const expandedItemIndex = removeIndex - 1;
		this.controls.controls[propIndex].get('moreItemsExpanded').setValue((expandedItemIndex < 0) ? 0 : expandedItemIndex);
		this.controls.controls[propIndex].get('moreItemsConfig').value.splice(removeIndex, 1);
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
		} else if (config.type === DynamicFormTypeFieldEnum.checkbox) {
			value = false;
		}
		
		return this.fb.group({
			label: [config.label],
			name: [config.name],
			type: [config.type],
			appearance: [config.appearance],
			floatLabel: [config.floatLabel],
			class: [config.class],
			fieldClass: [config.fieldClass],
			textHint: [config.textHint],
			required: [config.required ?? false],
			opcoesSelect: [config.opcoesSelect ?? []],
			hidePassword: config.type === DynamicFormTypeFieldEnum.password ? true : null,
			moreItemsButtonIconAddlabel: [config.moreItemsButtonIconAddlabel],
			moreItemsIcon: [config.moreItemsIcon],
			moreItemsExpanded: [''],
			moreItemsConfig: [[]],
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
}
