import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicFormFieldInterface } from './interfaces/dynamic-form-field.interface';
import { DynamicFormTypeFieldEnum } from './enums/dynamic-form-type-field.enum';
import { CpfValidator } from './validators/cpf.validator';
import { CnpjValidator } from './validators/cnpj.validator';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormAbstract } from '../../../../core/form.abstract';
import { KoalaStringHelper } from 'tskoala-helpers/dist/string/koala-string.helper';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'koala-dynamic-form',
  templateUrl: 'dynamic-form.component.html'
})
export class DynamicFormComponent extends FormAbstract implements OnInit {
  @Input() formConfig: DynamicFormFieldInterface[];
  @Input() getData: BehaviorSubject<boolean>;
  @Output() formSubmit = new EventEmitter<any>();
  @Output() dynamicForm = new EventEmitter<FormGroup>(null);
  public controls: FormArray;
  public form: FormGroup;
  public typeField = DynamicFormTypeFieldEnum;

  constructor(
    private fb: FormBuilder
  ) {
    super(() => this.form);
  }

  ngOnInit() {
    this.form = this.fb.group({});
    this.form.addControl('formData', this.fb.array([]));
    this.controls = this.form.get('formData') as FormArray;
    this.formConfig?.forEach(config => {
      this.controls.push(this.newControl(config));
    });
    this.dynamicForm.emit(this.form);
    this.getData?.subscribe(getData => {
      if (getData) {
        this.emitData();
      }
    });
  }

  public emitData() {
    const data = {};
    this.controls?.controls.forEach(control => {
      let value: any = control.get('value').value;
      if (control.get('type').value === DynamicFormTypeFieldEnum.valueList) {
        value = KoalaStringHelper.split(value);
      }
      data[control.get('name').value] = value;
    });
    this.formSubmit.emit(data);
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

  private newControl(config: DynamicFormFieldInterface): FormGroup {
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
      textHint: [config.textHint],
      required: [config.required ?? false],
      opcoesSelect: [config.opcoesSelect ?? []],
      hidePassword: config.type === DynamicFormTypeFieldEnum.password ? true : null,
      value: [value, validators]
    });
  }
}
