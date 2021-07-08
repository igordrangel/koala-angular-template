import { AbstractControl } from "@angular/forms";
import { KoalaDynamicFormValidatorResultHelper } from "../../../../../../ngx-koala/src/lib/shared/helpers/dynamic-form/koala-dynamic-form-validator-result.helper";
import { KoalaDynamicFormConfigInterface } from "../../../../../../ngx-koala/src/lib/shared/components/form/dynamic-form/interfaces/koala.dynamic-form-config.interface";

export function CustomSyncValidator(config: () => KoalaDynamicFormConfigInterface) {
  return (control: AbstractControl) => {
    config()?.setValues.next([
      {name: 'text', value: control.value}
    ]);
    return KoalaDynamicFormValidatorResultHelper.generate('Custom Sync Validator Message');
  }
}
