import { KoalaDynamicFormConfigInterface, KoalaDynamicFormValidatorResultHelper } from "@koalarx/ui/form";
import { delay } from "@koalarx/utils/operators/delay";
import { AbstractControl } from "@angular/forms";

export function CustomAsyncValidator(config: () => KoalaDynamicFormConfigInterface) {
  return async (control: AbstractControl) => {
    await delay(2000);
    config()?.setValues.next([
      {name: 'text', value: control.value}
    ]);
    return KoalaDynamicFormValidatorResultHelper.generate('Custom Async Validator Message');
  }
}
