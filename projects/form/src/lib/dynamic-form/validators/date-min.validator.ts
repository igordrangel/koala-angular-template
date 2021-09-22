import { AbstractControl, ValidationErrors } from "@angular/forms";
import { KoalaCustomValidatorFnInterface } from "../interfaces/koala-custom-validator-fn.interface";

export function DateMinValidator(min: string): KoalaCustomValidatorFnInterface {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value && typeof min === 'string') {
      if (new Date(control.value) < new Date(min)) {
        return {dateMin: true};
      }
    }
    return null;
  }
}
