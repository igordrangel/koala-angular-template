import { FieldBase } from "./field.base";
import { UntypedFormBuilder } from "@angular/forms";
import { DeviceDetectorService } from "ngx-device-detector";
import { DynamicFormTypeFieldEnum, KoalaDynamicFormConfigInterface } from "@koalarx/ui/form";

export class FieldBuilder extends FieldBase {

  constructor(
    label: string,
    name: string,
    type: DynamicFormTypeFieldEnum,
    formConfig: KoalaDynamicFormConfigInterface,
    fb: UntypedFormBuilder,
    deviceService: DeviceDetectorService
  ) {
    super(label, name, type, formConfig, fb, deviceService);
  }
}
