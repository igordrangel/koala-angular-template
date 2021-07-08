import { KoalaDynamicFormConfigInterface } from "../../../../../../ngx-koala/src/lib/shared/components/form/dynamic-form/interfaces/koala.dynamic-form-config.interface";
import { KlDelay } from "koala-utils/dist/utils/KlDelay";
import { KoalaDynamicFormValidatorResultHelper } from "../../../../../../ngx-koala/src/lib/shared/helpers/dynamic-form/koala-dynamic-form-validator-result.helper";
import { AbstractControl } from "@angular/forms";

export function CustomAsyncValidator(config: () => KoalaDynamicFormConfigInterface) {
  return async (control: AbstractControl) => {
    await KlDelay.waitFor(2000);
    config()?.setValues.next([
      {name: 'text', value: control.value}
    ]);
    return KoalaDynamicFormValidatorResultHelper.generate('Custom Async Validator Message');
  }
}
