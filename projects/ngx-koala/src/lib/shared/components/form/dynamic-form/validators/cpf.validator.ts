import { AbstractControl } from '@angular/forms';
import { ValidationHelper } from './validation.helper';

export function CpfValidator(control: AbstractControl) {
  if (control.value) {
    if (control.value.length <= 14 && !ValidationHelper.validateCpf(control.value)) {
      return {cpfInvalid: true};
    }
  }
  return null;
}
