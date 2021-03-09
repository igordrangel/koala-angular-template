import { AbstractControl, ValidationErrors } from "@angular/forms";

export interface KoalaCustomValidatorFnInterface {
  (control: AbstractControl): ValidationErrors | null
}
