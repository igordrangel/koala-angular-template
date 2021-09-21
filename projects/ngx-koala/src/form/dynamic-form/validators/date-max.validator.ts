import { AbstractControl, ValidationErrors } from "@angular/forms";
import { KoalaCustomValidatorFnInterface } from "../interfaces/koala-custom-validator-fn.interface";

export function DateMaxValidator(max: string): KoalaCustomValidatorFnInterface {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value && typeof max === 'string') {
      if (new Date(control.value) > new Date(max)) {
        return {dateMax: true};
      }
    }
    return null;
  }
}
