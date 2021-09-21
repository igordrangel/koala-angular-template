import { AbstractControl } from '@angular/forms';
import { ValidationHelper } from './validation.helper';

export function CnpjValidator(control: AbstractControl) {
  if (control.value) {
    if (control.value.length > 14 && !ValidationHelper.validateCnpj(control.value)) {
      return {cnpjInvalid: true};
    }
  }
  return null;
}
