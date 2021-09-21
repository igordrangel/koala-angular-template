export class KoalaDynamicFormValidatorResultHelper {

  public static generate(errorMessage: string) {
    return {
      customError: {
        message: errorMessage
      }
    }
  }
}
