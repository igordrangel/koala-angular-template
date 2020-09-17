import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KoalaDynamicFormFieldInterface } from './interfaces/koala.dynamic-form-field.interface';
import { DynamicFormTypeFieldEnum } from './enums/dynamic-form-type-field.enum';
import { CpfValidator } from './validators/cpf.validator';
import { CnpjValidator } from './validators/cnpj.validator';
import { Component, Input, OnInit } from '@angular/core';
import { FormAbstract } from '../../../../core/form.abstract';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'koala-dynamic-form',
  templateUrl: 'dynamic-form.component.html'
})
export class DynamicFormComponent extends FormAbstract implements OnInit {
  @Input() form: FormGroup;
  @Input() formConfig: KoalaDynamicFormFieldInterface[];
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
    this.formConfig?.forEach(config => {
      const newFormGroup = this.newControl(config);
      if (config.valueChanges) {
        newFormGroup.get('value')
                    .valueChanges
                    .pipe(debounceTime(300))
                    .subscribe(value => config.valueChanges(value));
      }
      this.controls.push(newFormGroup);
    });
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
      value: [value, validators]
    });
  }
}
