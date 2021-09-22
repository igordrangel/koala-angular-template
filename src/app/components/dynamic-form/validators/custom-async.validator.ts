import { KoalaDynamicFormConfigInterface, KoalaDynamicFormValidatorResultHelper } from "@koalarx/ui/form";
import { KlDelay } from "@koalarx/utils/dist/utils/KlDelay";
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
