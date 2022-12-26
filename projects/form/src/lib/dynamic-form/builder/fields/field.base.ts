import { KoalaDynamicFormFieldInterface } from "../../interfaces/koala.dynamic-form-field.interface";
import { DynamicFormTypeFieldEnum } from "../../enums/dynamic-form-type-field.enum";
import { LegacyFloatLabelType as FloatLabelType, MatLegacyFormFieldAppearance as MatFormFieldAppearance } from "@angular/material/legacy-form-field";
import { AsyncValidatorFn, UntypedFormBuilder, ValidatorFn } from "@angular/forms";
import { KoalaDynamicFormConfigInterface } from "../../interfaces/koala.dynamic-form-config.interface";
import { koala } from "@koalarx/utils";
import { DeviceDetectorService } from "ngx-device-detector";
import { DynamicFormBuilder } from "../dynamic-form.builder";

export abstract class FieldBase {
  protected readonly fieldConfig: KoalaDynamicFormFieldInterface;

  protected constructor(
    label: string,
    name: string,
    type: DynamicFormTypeFieldEnum,
    private formConfig: KoalaDynamicFormConfigInterface,
    protected fb: UntypedFormBuilder,
    protected deviceService: DeviceDetectorService
  ) {
    this.fieldConfig = {
      label,
      name,
      type
    }
    this.appearance().grid();
  }

  public hide(hide: boolean = true) {
    this.fieldConfig.show = !hide;
    return this;
  }

  public focus() {
    this.fieldConfig.focus = true;
    return this;
  }

  public syncValidator(validators: ValidatorFn[]) {
    this.fieldConfig.syncValidators = validators;
    return this;
  }

  public asyncValidator(validators: AsyncValidatorFn | AsyncValidatorFn[]) {
    this.fieldConfig.asyncValidators = validators;
    return this;
  }

  public disabled(disabled: boolean = true) {
    this.fieldConfig.disabled = disabled;
    return this;
  }

  public required(required: boolean = true) {
    this.fieldConfig.required = required;
    return this;
  }

  public textHint(hint: string) {
    this.fieldConfig.textHint = hint;
    return this;
  }

  public min(min: number) {
    this.fieldConfig.min = min;
    return this;
  }

  public max(max: number) {
    this.fieldConfig.max = max;
    return this;
  }

  public minLength(min: number) {
    this.fieldConfig.minLength = min;
    return this;
  }

  public maxLength(max: number) {
    this.fieldConfig.maxLength = max;
    return this;
  }

  public multiple(multiple = true) {
    this.fieldConfig.multiple = multiple;
    return this;
  }

  public valueChanges<T>(fn: (value: T) => void) {
    this.fieldConfig.valueChanges = fn;
    return this;
  }

  public setValue(value: any) {
    this.fieldConfig.value = value;
    return this;
  }

  public appearance(type: MatFormFieldAppearance = "outline", floatLabel: FloatLabelType = "always") {
    this.fieldConfig.appearance = type;
    this.fieldConfig.floatLabel = floatLabel;
    return this;
  }

  public grid(size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 = 12, width: number = 100) {
    if (this.deviceService.isMobile()) {
      size = 12;
    }

    for (let colSize = 12; colSize >= 1; colSize--) {
      this.fieldConfig.class = this.fieldConfig.class?.replace('col-' + colSize, '');
    }
    this.addClass('col-' + size);
    this.addFieldClass('w-' + width);

    return this;
  }

  public setOptions(options: { value: any; name: string; }[]) {
    this.fieldConfig.opcoesSelect = options;
    return this;
  }

  public addClass(className: string) {
    if (
      this.deviceService.isMobile() &&
      className.indexOf('col-') >= 0 &&
      className.indexOf('col-12') === 0
    ) {
      className = className.replace('col-1', 'col-12')
                           .replace('col-2', 'col-12')
                           .replace('col-3', 'col-12')
                           .replace('col-4', 'col-12')
                           .replace('col-5', 'col-12')
                           .replace('col-6', 'col-12')
                           .replace('col-7', 'col-12')
                           .replace('col-8', 'col-12')
                           .replace('col-9', 'col-12')
                           .replace('col-10', 'col-12')
                           .replace('col-11', 'col-12');
    }

    this.fieldConfig.class = koala(`${this.fieldConfig?.class ?? ''} ${className}`)
      .string()
      .split(' ')
      .clearEmptyValues()
      .toString(' ')
      .getValue();
    return this;
  }

  public addFieldClass(className: string) {
    this.fieldConfig.fieldClass = koala(`${this.fieldConfig?.fieldClass ?? ''} ${className}`)
      .string()
      .split(' ')
      .clearEmptyValues()
      .toString(' ')
      .getValue();
    return this;
  }

  public setCustomMasc(mask: string, config?: {
    thousandSeparator?: string;
    suffix?: string;
    prefix?: string;
  }) {
    this.fieldConfig.customMasc = mask;
    this.fieldConfig.customMascThousandSeparator = config?.thousandSeparator;
    this.fieldConfig.customMascSuffix = config?.suffix;
    this.fieldConfig.customMascPrefix = config?.prefix;
    return this;
  }

  public generate() {
    let getLastConfig = (this.formConfig.formConfig.length > 0) ?
      this.formConfig.formConfig[this.formConfig.formConfig.length - 1] :
      null;

    if (getLastConfig?.type === DynamicFormTypeFieldEnum.moreItems && getLastConfig?.name !== 'endMoreItems') {
      this.formConfig.formConfig[this.formConfig.formConfig.length - 1].moreItemsConfig.formConfig.push(this.fieldConfig);
    } else {
      if (getLastConfig?.name === 'endMoreItems') {
        this.formConfig.formConfig.splice(this.formConfig.formConfig.length - 1, 1);
      }

      this.formConfig.formConfig.push(this.fieldConfig);
    }
    return new DynamicFormBuilder(
      this.fb,
      this.deviceService,
      this.formConfig.formConfig
    );
  }
}
