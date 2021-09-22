import { AbstractControl } from "@angular/forms";
import { KoalaDynamicFormValidatorResultHelper, KoalaDynamicFormConfigInterface } from "@koalarx/ui/form";

export function CustomSyncValidator(config: () => KoalaDynamicFormConfigInterface) {
  return (control: AbstractControl) => {
    config()?.setValues.next([
      {name: 'text', value: control.value}
    ]);
    return KoalaDynamicFormValidatorResultHelper.generate('Custom Sync Validator Message');
  }
}
