export class MatFormFieldHelper {
  // Devido a mudanças constantes de estado dos campos de formulário, em certos casos o componente do Material Angular não se comporta conforme o esperado, devido a isso, este Helper tem essa função
  public static fixDisabledStateForDisabledFields() {
    document.querySelectorAll(".mat-form-field input:disabled").forEach(inputEl => {
      let matFormFieldElement: HTMLDivElement;
      let tmpElement: Element;

      do {
        tmpElement = tmpElement ? tmpElement.parentElement : inputEl.parentElement;
        if (tmpElement.classList.contains('mat-form-field')) {
          matFormFieldElement = tmpElement as HTMLDivElement;
        }
      } while (!matFormFieldElement);

      matFormFieldElement?.classList.add('mat-form-field-disabled');
    });
  }
}
