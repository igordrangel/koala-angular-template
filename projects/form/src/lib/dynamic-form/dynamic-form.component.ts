import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators, AbstractControl } from '@angular/forms';
import { KoalaDynamicFormFieldInterface } from './interfaces/koala.dynamic-form-field.interface';
import { DynamicFormTypeFieldEnum } from './enums/dynamic-form-type-field.enum';
import { CpfValidator } from './validators/cpf.validator';
import { CnpjValidator } from './validators/cnpj.validator';
import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormAbstract } from '../form.abstract';
import { debounceTime } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { KoalaDynamicSetValueInterface } from './interfaces/koala.dynamic-set-value.interface';
import { AutocompleteSelectedValidator } from './validators/autocomplete-selected.validator';
import { KoalaDynamicAutocompleteOptionsInterface } from './interfaces/koala.dynamic-autocomplete-options.interface';
import { KoalaDynamicFormShowFieldInterface } from './interfaces/koala.dynamic-form-show-field.interface';
import { KoalaDynamicFormService } from './koala.dynamic-form.service';
import { KoalaDynamicFormMoreItensShowFieldConfigInterface } from './interfaces/koala.dynamic-form-more-itens-show-field-config.interface';
import { ThemePalette } from '@angular/material/core';
import { KoalaDynamicFormAutocompleteMultipleConfigInterface } from './interfaces/koala.dynamic-form-autocomplete-multiple-config.interface';
import { KoalaDynamicFormConfigInterface } from './interfaces/koala.dynamic-form-config.interface';
import { delay } from "@koalarx/utils/operators/delay";
import { koala } from "@koalarx/utils";
import { DateMinValidator } from "./validators/date-min.validator";
import { DateMaxValidator } from "./validators/date-max.validator";
import { KoalaLanguageHelper } from "@koalarx/ui/core";
import { randomString } from "@koalarx/utils/operators/string";

@Component({
  selector: 'koala-dynamic-form',
  templateUrl: 'dynamic-form.component.html',
  styleUrls: ['dynamic-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent extends FormAbstract implements OnInit {
  @Input() form: UntypedFormGroup;
  @Input() formConfig: KoalaDynamicFormFieldInterface[];
  @Input() showFields: BehaviorSubject<KoalaDynamicFormShowFieldInterface[]>;
  @Input() showFieldsMoreItensConfig: KoalaDynamicFormMoreItensShowFieldConfigInterface[];
  @Input() setValues: BehaviorSubject<KoalaDynamicSetValueInterface[]>;
  @Input() tabIndexStart: number = 1;

  public controls: UntypedFormArray;
  public typeField = DynamicFormTypeFieldEnum;
  public hoursAndMinutesMask = '00:000';
  public errorMessage = KoalaLanguageHelper;
  public formId = randomString(25, {
    lowercase: true,
    uppercase: true,
    numbers: false,
    specialCharacters: false
  });

  constructor(
    private fb: UntypedFormBuilder,
    private dynamicFormService: KoalaDynamicFormService
  ) {
    super(() => this.form);
  }

  ngOnInit() {
    if (!this.form.get('formData')) {
      this.form.addControl('formData', this.fb.array([]));
    }
    this.controls = this.form.get('formData') as UntypedFormArray;
    this.formConfig?.forEach((config, indexConfig) => {
      const newFormGroup = this.newControl(config);
      if (config.asyncValidators) {
        newFormGroup.get('value').setAsyncValidators(config.asyncValidators);
      }
      newFormGroup.get('value').updateValueAndValidity();
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
                            newFormGroup.get('multiple').value
                          )) {
                          if (newFormGroup.get('multiple').value) {
                            if (Array.isArray(value)) {
                              newFormGroup.get('autocompleteSelectedValue').setValue(value);
                              newFormGroup.get('value').setValue(value[value.length - 1], {emitEvent: false});
                            } else {
                              if (this.validateAutocompleteSelect(newFormGroup.get('autocompleteSelectedValue').value, value)) {
                                newFormGroup.get('autocompleteSelectedValue').value.push(value);
                              }
                            }

                            const autocompleteInput = document.querySelector<HTMLInputElement>(`#${this.formId} input#autocomplete-${newFormGroup.get('name')?.value}`);
                            if (autocompleteInput) {
                              autocompleteInput.value = '';
                            }
                          } else {
                            newFormGroup.get('autocompleteSelectedValue').setValue(value);
                          }
                        } else if (!newFormGroup.get('multiple').value) {
                          newFormGroup.get('autocompleteSelectedValue').setValue(koala(this.formConfig)
                            .array<KoalaDynamicFormFieldInterface>()
                            .filter(newFormGroup.get('name').value, 'name')
                            .getValue()[0]?.autocompleteDefaultValueOnClear ?? null);
                        }

                        if (config.type === DynamicFormTypeFieldEnum.autocomplete) {
                          if (config.autocompleteType === 'all') {
                            const autocompleteOptionsSubject = newFormGroup.get('autocompleteOptions').value as BehaviorSubject<KoalaDynamicAutocompleteOptionsInterface[]>;
                            newFormGroup.get('autocompleteOptionsFiltered').value.next(this.autocompleteFilter(
                              autocompleteOptionsSubject.value,
                              value
                            ));
                          } else if (config.autocompleteType === 'onDemand' && typeof value !== "object") {
                            const loader = newFormGroup.get('autocompleteLoading').value as BehaviorSubject<boolean>;
                            loader.next(true);
                            config.autocompleteFilter(value).subscribe(options => {
                              newFormGroup.get('autocompleteOptionsFiltered').value.next(options);
                              loader.next(false);
                            });
                          }
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

  public isValidNewAutocompleteOption(value: any) {
    return !!value && typeof value === 'string';
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
      const formGroup = this.fb.group({});
      this.controls.controls[propIndex].get('moreItemsConfig').value.push({
        form: formGroup,
        formConfig: this.formConfig[propIndex].moreItemsConfig.formConfig,
        showFields: new BehaviorSubject<BehaviorSubject<KoalaDynamicSetValueInterface[]>[]>([]),
        showFieldsMoreItensConfig: this.formConfig[propIndex].moreItemsConfig.showFieldsConfig
      });
      this.controls.controls[propIndex].get('moreItemsExpanded').setValue(
        this.controls.controls[propIndex].get('moreItemsConfig').value.length - 1
      );
      const formArrayMoreItems = this.controls.controls[propIndex].get('moreItemsFormGroup') as UntypedFormArray;
      formArrayMoreItems.push(formGroup);
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

  public getAutocompleteOptions(propriedade: AbstractControl) {
    return propriedade.get('autocompleteOptionsFiltered').value as BehaviorSubject<any[]>;
  }

  public getDynamicFormConfig(propriedade: AbstractControl) {
    return propriedade.get('dynamicFormConfig').value as BehaviorSubject<KoalaDynamicFormConfigInterface>;
  }

  public getRandomString() {
    return randomString(20, {
      lowercase: true,
      numbers: true,
      specialCharacters: false,
      uppercase: true
    });
  }

  private newControl(config: KoalaDynamicFormFieldInterface): UntypedFormGroup {
    let validators = config.syncValidators ?? [];
    let value: any = config.value ?? '';
    let valueSelectedAutocomplete: KoalaDynamicAutocompleteOptionsInterface | KoalaDynamicAutocompleteOptionsInterface[] = (
      config.multiple ? [] : (config.autocompleteDefaultValueOnClear ?? null)
    );

    if (config.required === true) validators.push(Validators.required);
    if (config.min && typeof config.min === "number") validators.push(Validators.min(config.min));
    if (config.max && typeof config.max === "number") validators.push(Validators.max(config.max));
    if (
      config.type === DynamicFormTypeFieldEnum.date ||
      config.type === DynamicFormTypeFieldEnum.datetime ||
      config.type === DynamicFormTypeFieldEnum.time
    ) {
      if (config.min && typeof config.min === "string") { validators.push(DateMinValidator(config.min)); }
      if (config.max && typeof config.max === "string") { validators.push(DateMaxValidator(config.max)); }
    }
    if (config.minLength) validators.push(Validators.minLength(config.minLength));
    if (config.maxLength) validators.push(Validators.maxLength(config.maxLength));

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

    if (config.show === false) {
      validators = [];
    }

    const field = this.fb.group({
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
      dynamicFormGroup: this.fb.array([]),
      appearance: [config.appearance],
      floatLabel: [config.floatLabel],
      placeholder: [config.placeholder],
      class: [config.class],
      fieldClass: [config.fieldClass],
      textHint: [config.textHint],
      required: [config.required ?? false],
      min: [config.min ?? 0],
      max: [config.max ?? 99999999999],
      minLength: [config.minLength ?? 0],
      maxLength: [config.maxLength ?? 255],
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
      moreItemsFormGroup: this.fb.array([]),
      autocompleteLoading: [new BehaviorSubject<boolean>(false)],
      autocompleteOptions: [config.autocompleteOptions],
      autocompleteMultipleConfig: [config.autocompleteMultipleConfig],
      autocompleteOptionsFiltered: [new BehaviorSubject<any>([])],
      autocompleteSelectedValue: [valueSelectedAutocomplete],
      autocompleteAddOption: [config.autocompleteAddOption],
      textLogs: [config?.textObs],
      customMasc: [config?.customMasc],
      customMascThousandSeparator: [config?.customMascThousandSeparator ?? ''],
      customMascSuffix: [config?.customMascSuffix ?? ''],
      customMascPrefix: [config?.customMascPrefix ?? ''],
      value: [{value, disabled: config.disabled}, validators, config.asyncValidators]
    });

    if (config.autocompleteType === "onDemand") {
      const loader = field.get('autocompleteLoading').value as BehaviorSubject<boolean>;
      loader.next(true);
      config.autocompleteFilter('').subscribe(options => {
        field.get('autocompleteOptionsFiltered').value.next(options);
        loader.next(false);
      });
    }

    return field;
  }

  private setValuesOnFields(subject: BehaviorSubject<KoalaDynamicSetValueInterface[]>, form: UntypedFormGroup) {
    subject.subscribe(item => {
      if (item) {
        const formArray = form.get('formData') as UntypedFormArray;
        for (const prop of item.values()) {
          this.setValueByProp(formArray, prop);
        }
      }
    });
  }

  private changeVisibilityFields(subject: BehaviorSubject<KoalaDynamicFormShowFieldInterface[]>, form: UntypedFormGroup) {
    subject.pipe(debounceTime(5)).subscribe(item => {
      if (item) {
        const formArray = form.get('formData') as UntypedFormArray;
        for (const prop of item.values()) {
          for (const [indexControl, control] of formArray.controls.entries()) {
            if (control.get('name').value === prop.name) {
              control.get('show').value.next(prop.show);
              const config: KoalaDynamicFormFieldInterface = this.formConfig[indexControl] ?? null;
              if (prop.show) {
                let validators = [];
                if (config) {
                  if (config.type === DynamicFormTypeFieldEnum.dynamicForm) {
                    const formArrayMoreItems = control.get('dynamicFormGroup') as UntypedFormArray;
                    formArrayMoreItems.push(config?.dynamicFormConfig?.form);
                  } else {
                    validators = config.syncValidators ?? [];
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

                    if (config.min && typeof config.min === "number") validators.push(Validators.min(config.min));
                    if (config.max && typeof config.max === "number") validators.push(Validators.max(config.max));
                    if (
                      config.type === DynamicFormTypeFieldEnum.date ||
                      config.type === DynamicFormTypeFieldEnum.datetime ||
                      config.type === DynamicFormTypeFieldEnum.time
                    ) {
                      if (config.min && typeof config.min === "string") { validators.push(DateMinValidator(config.min)); }
                      if (config.max && typeof config.max === "string") { validators.push(DateMaxValidator(config.max)); }
                    }
                    if (config.minLength) validators.push(Validators.minLength(config.minLength));
                    if (config.maxLength) validators.push(Validators.maxLength(config.maxLength));

                    control.get('value').setValidators(validators);
                    if (config.asyncValidators) {
                      control.get('value').setAsyncValidators(config.asyncValidators);
                    }
                  }

                  control.get('value').updateValueAndValidity();
                  if (prop.clearCurrentValue) {
                    control.get('value').setValue(null);
                  }
                }
              } else {
                control.get('value').clearValidators();
                control.get('value').clearAsyncValidators();
                control.setErrors(null);
                control.get('value').setValue(null);
                control.get('value').updateValueAndValidity();

                if (config.type === DynamicFormTypeFieldEnum.dynamicForm) {
                  const formGroup = control as UntypedFormGroup;
                  formGroup.removeControl('dynamicFormGroup');
                  formGroup.addControl('dynamicFormGroup', this.fb.array([]));
                }
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

  private setValueByProp(formArray: UntypedFormArray, prop: KoalaDynamicSetValueInterface) {
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
                dynamicForm.setValues.next(koala(dynamicForm.setValues.getValue()).array<any>().merge([{
                  name: arrPropName[arrPropName.length - 1],
                  value: prop.value
                }]).getValue());
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

  private async setConfigDynamicForm(newFormGroup: UntypedFormGroup) {
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
            await delay(1);
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

  private validateAutocompleteSelect(selectedValues: KoalaDynamicAutocompleteOptionsInterface[], value: KoalaDynamicAutocompleteOptionsInterface) {
    let isValid = true;

    for (const selectedItem of selectedValues.values()) {
      if (selectedItem.name === value.name) {
        isValid = false;
        break;
      }
    }

    return isValid;
  }
}
