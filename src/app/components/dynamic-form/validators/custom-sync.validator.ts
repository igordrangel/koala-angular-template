import { AbstractControl } from "@angular/forms";
import { KoalaDynamicFormValidatorResultHelper, KoalaDynamicFormConfigInterface } from "@koalarx/ui/form";
import { delay } from "@koalarx/utils/operators/delay";

export function CustomSyncValidator(config: () => KoalaDynamicFormConfigInterface) {
  return (control: AbstractControl) => {
    delay(300).then(() => {
      config()?.setValues.next([
        {name: 'text', value: control.value}
      ]);
    })
    return KoalaDynamicFormValidatorResultHelper.generate('Custom Sync Validator Message');
  }
}
