import { DynamicFormTypeFieldEnum } from "../../enums/dynamic-form-type-field.enum";
import { FieldBase } from "./field.base";
import { FormBuilder } from "@angular/forms";
import { KoalaDynamicFormConfigInterface } from "../../interfaces/koala.dynamic-form-config.interface";
import { DeviceDetectorService } from "ngx-device-detector";

export class FieldBuilder extends FieldBase {

  constructor(
    label: string,
    name: string,
    type: DynamicFormTypeFieldEnum,
    formConfig: KoalaDynamicFormConfigInterface,
    fb: FormBuilder,
    deviceService: DeviceDetectorService
  ) {
    super(label, name, type, formConfig, fb, deviceService);
  }
}
