import { AbstractControl } from "@angular/forms";
import { KoalaDynamicFormValidatorResultHelper, KoalaDynamicFormConfigInterface } from "../../../../../../ngx-koala/src/form";

export function CustomSyncValidator(config: () => KoalaDynamicFormConfigInterface) {
  return (control: AbstractControl) => {
    config()?.setValues.next([
      {name: 'text', value: control.value}
    ]);
    return KoalaDynamicFormValidatorResultHelper.generate('Custom Sync Validator Message');
  }
}
