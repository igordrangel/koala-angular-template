import { KoalaDynamicFormFieldInterface } from "../../../../components/form/dynamic-form/interfaces/koala.dynamic-form-field.interface";
import { DynamicFormTypeFieldEnum } from "../../../../components/form/dynamic-form/enums/dynamic-form-type-field.enum";
import { FloatLabelType, MatFormFieldAppearance } from "@angular/material/form-field";
import { DynamicFormBuilder } from "../dynamic-form.builder";
import { FormBuilder } from "@angular/forms";
import { KoalaDynamicFormConfigInterface } from "../../../../components/form/dynamic-form/interfaces/koala.dynamic-form-config.interface";

export abstract class FieldBase {
  protected readonly fieldConfig: KoalaDynamicFormFieldInterface;

  protected constructor(
    label: string,
    name: string,
    type: DynamicFormTypeFieldEnum,
    private formConfig: KoalaDynamicFormConfigInterface,
    protected fb: FormBuilder
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

  public valueChanges<T>(fn: (value: T) => void) {
    this.fieldConfig.valueChanges = fn;
    return this;
  }

  public appearance(type: MatFormFieldAppearance = "outline", floatLabel: FloatLabelType = "always") {
    this.fieldConfig.appearance = type;
    this.fieldConfig.floatLabel = floatLabel;
    return this;
  }

  public grid(size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 = 12, width: number = 100) {
    this.fieldConfig.class = 'col-' + size;
    this.fieldConfig.fieldClass = 'w-' + width;
    return this;
  }

  public setOptions(options: { value: any; name: string; }[]) {
    this.fieldConfig.opcoesSelect = options;
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
      this.formConfig.formConfig
    );
  }
}
