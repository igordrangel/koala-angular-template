import { AbstractControl } from '@angular/forms';

export function AutocompleteSelectedValidator(control: AbstractControl) {
  if (
    control.value &&
    control.value.hasOwnProperty('value') &&
    control.value.hasOwnProperty('name') &&
    Object.keys(control.value).length === 2
  ) {
    return null;
  }

  return {autocompleteSelected: true};
}
