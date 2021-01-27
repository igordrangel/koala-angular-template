import { DynamicFormTypeFieldEnum } from "../../../../components/form/dynamic-form/enums/dynamic-form-type-field.enum";
import { KoalaDynamicFormConfigInterface } from "../koala.dynamic-form-config.interface";
import { FormBuilder } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { KoalaDynamicSetValueInterface } from "../../../../components/form/dynamic-form/interfaces/koala.dynamic-set-value.interface";
import { DynamicFormBuilder } from "../dynamic-form.builder";
import { KoalaDynamicFormFieldInterface } from "../../../../components/form/dynamic-form/interfaces/koala.dynamic-form-field.interface";

export class MoreItemsBuilder {

  constructor(
    private label: string,
    private name: string,
    private btnAddLabel: string,
    private min: number,
    private max: number,
    private formConfig: KoalaDynamicFormConfigInterface,
    private fb: FormBuilder
  ) {
  }

  public build() {
    const fieldConfig: KoalaDynamicFormFieldInterface = {
      label: this.label,
      name: this.name,
      type: DynamicFormTypeFieldEnum.moreItems,
      moreItemsIconBackgroundColor: '#212121',
      moreItemsIconFontColor: '#fff',
      moreItemsMinItems: this.min,
      moreItemsMaxItems: this.max,
      moreItemsButtonIconAddlabel: this.btnAddLabel,
      moreItemsConfig: {
        form: this.fb.group({}),
        formConfig: [],
        setValues: new BehaviorSubject<BehaviorSubject<KoalaDynamicSetValueInterface[]>[]>(null)
      }
    };
    this.formConfig.formConfig.push(fieldConfig);

    return new DynamicFormBuilder(
      this.fb,
      fieldConfig.moreItemsConfig.formConfig
    );
  }
}
