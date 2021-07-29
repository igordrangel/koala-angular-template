export type KoalaLanguageType = 'ptBr'|'enUs';

export class KoalaLanguageHelper {
  private static language: KoalaLanguageType

  public static setLanguage(language: KoalaLanguageType) {
    this.language = language;
  }

  public static getLanguage() {
    return this.language;
  }

  public static getBtnLabel() {
    switch (this.language) {
      case "enUs":
        return 'Send';
      default:
        return 'Enviar';
    }
  }

  public static getYesMessage() {
    switch (this.language) {
      case "enUs":
        return 'Yes';
      default:
        return 'Sim';
    }
  }

  public static getNoMessage() {
    switch (this.language) {
      case "enUs":
        return 'No';
      default:
        return 'Não';
    }
  }

  public static getInternalServerErrorMessage() {
    switch (this.language) {
      case "enUs":
        return 'We had a problem with your request.<br/>Sorry for the inconvenience.<br/><br/>Please try again later.';
      default:
        return 'Tivemos um problema com sua requisição.<br/>Sinto muito pelo transtorno.<br/><br/>Gentileza tentar novamente mais tarde.';
    }
  }

  public static getRequiredMessage(label: string) {
    switch (this.language) {
      case "enUs":
        return `${label} is required.`;
      default:
        return `${label} não informado(a).`;
    }
  }

  public static getInvalidMessage(label: string) {
    switch (this.language) {
      case "enUs":
        return `${label} is invalid.`;
      default:
        return `${label} inválido.`;
    }
  }

  public static getMinMessage(min: string) {
    switch (this.language) {
      case "enUs":
        return `Inform at least the value of ${min}.`;
      default:
        return `Informe no mínimo o valor de ${min}.`
    }
  }

  public static getMaxMessage(max: string) {
    switch (this.language) {
      case "enUs":
        return `Inform at most the value of ${max}.`;
      default:
        return `Informe no máximo o valor de ${max}.`
    }
  }

  public static getMinLengthMessage(minLength: string) {
    switch (this.language) {
      case "enUs":
        return `Enter a value with at least ${minLength} characters.`;
      default:
        return `Informe um valor com no mínimo ${minLength} caracteres.`
    }
  }

  public static getMaxLengthMessage(maxLength: string) {
    switch (this.language) {
      case "enUs":
        return `Enter a value with at most ${maxLength} characters.`;
      default:
        return `Informe um valor com no máximo ${maxLength} caracteres.`
    }
  }

  public static getDateMinMessage() {
    switch (this.language) {
      case "enUs":
        return `Inform at least the date of `;
      default:
        return `Informe no mínimo a data de `
    }
  }

  public static getDateMaxMessage() {
    switch (this.language) {
      case "enUs":
        return `Inform at most the date of `;
      default:
        return `Informe no máximo a data de `
    }
  }

  public static getAutocompleteMessage(label: string) {
    switch (this.language) {
      case "enUs":
        return `You must select a ${label}.`;
      default:
        return `Você deve selecionar um ${label}.`;
    }
  }
}
