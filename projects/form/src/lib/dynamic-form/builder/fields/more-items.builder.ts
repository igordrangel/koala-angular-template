import { DynamicFormTypeFieldEnum } from "../../enums/dynamic-form-type-field.enum";
import { UntypedFormBuilder } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { KoalaDynamicSetValueInterface } from "../../interfaces/koala.dynamic-set-value.interface";
import { KoalaDynamicFormFieldInterface } from "../../interfaces/koala.dynamic-form-field.interface";
import { KoalaDynamicFormConfigInterface } from "../../interfaces/koala.dynamic-form-config.interface";
import { DeviceDetectorService } from "ngx-device-detector";
import { DynamicFormBuilder } from "../dynamic-form.builder";

export class MoreItemsBuilder {
  private fieldConfig: KoalaDynamicFormFieldInterface;

  constructor(
    private label: string,
    private name: string,
    private btnAddLabel: string,
    private min: number,
    private max: number,
    private formConfig: KoalaDynamicFormConfigInterface,
    private fb: UntypedFormBuilder,
    private deviceService: DeviceDetectorService,
  ) {
  }

  public build() {
    let getLastConfig = (this.formConfig.formConfig.length > 0) ?
      this.formConfig.formConfig[this.formConfig.formConfig.length - 1] :
      null;

    this.fieldConfig = {
      label: this.label,
      name: this.name,
      type: DynamicFormTypeFieldEnum.moreItems,
      moreItemsIconBackgroundColor: '#fff',
      moreItemsIconFontColor: '#212121',
      moreItemsMinItems: this.min,
      moreItemsMaxItems: this.max,
      moreItemsButtonIconAddlabel: this.btnAddLabel,
      moreItemsConfig: {
        form: this.fb.group({}),
        formConfig: [],
        setValues: new BehaviorSubject<BehaviorSubject<KoalaDynamicSetValueInterface[]>[]>([])
      }
    };

    if (getLastConfig?.type === DynamicFormTypeFieldEnum.moreItems && getLastConfig?.name !== 'endMoreItems') {
      let formConfigMoreItems = getLastConfig.moreItemsConfig.formConfig as KoalaDynamicFormFieldInterface[];
      if (formConfigMoreItems.length > 0) {
        let lastIndexMoreItems = 0;
        formConfigMoreItems.forEach((item, index) => {
          if (item.type === DynamicFormTypeFieldEnum.moreItems) lastIndexMoreItems = index;
        });
        formConfigMoreItems[lastIndexMoreItems].moreItemsConfig.formConfig.push(this.fieldConfig);
      } else {
        this.formConfig.formConfig[this.formConfig.formConfig.length - 1].moreItemsConfig.formConfig.push(this.fieldConfig);
      }
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
