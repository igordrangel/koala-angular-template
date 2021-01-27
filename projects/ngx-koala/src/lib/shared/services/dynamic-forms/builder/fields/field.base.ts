import { KoalaDynamicFormFieldInterface } from "../../../../components/form/dynamic-form/interfaces/koala.dynamic-form-field.interface";
import { DynamicFormTypeFieldEnum } from "../../../../components/form/dynamic-form/enums/dynamic-form-type-field.enum";
import { KoalaDynamicFormConfigInterface } from "../koala.dynamic-form-config.interface";
import { FloatLabelType, MatFormFieldAppearance } from "@angular/material/form-field";
import { DynamicFormBuilder } from "../dynamic-form.builder";
import { FormBuilder } from "@angular/forms";

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

  public focus() {
    this.fieldConfig.focus = true;
    return this;
  }

  public disabled() {
    this.fieldConfig.disabled = true;
    return this;
  }

  public required() {
    this.fieldConfig.required = true;
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

  public grid(size: 1|2|3|4|5|6|7|8|9|10|11|12 = 12, width: number = 100) {
    this.fieldConfig.class = 'col-' + size;
    this.fieldConfig.fieldClass = 'w-' + width;
    return this;
  }

  public setOptions(options: {value: any; name: string;}[]) {
    this.fieldConfig.opcoesSelect = options;
    return this;
  }

  public generate() {
    this.formConfig.formConfig.push(this.fieldConfig);
    return new DynamicFormBuilder(
      this.fb,
      this.formConfig.formConfig
    );
  }
}
