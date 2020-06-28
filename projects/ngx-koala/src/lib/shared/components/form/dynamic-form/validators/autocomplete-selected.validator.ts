import { AbstractControl } from '@angular/forms';

export function AutocompleteSelectedValidator(control: AbstractControl) {
  if (control.value !== '' && typeof control.value !== 'object') {
    return {autocompleteSelected: true};
  }
  return null;
}
