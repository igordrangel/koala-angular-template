export class ValidationHelper {
  public static validateCpf(value: string) {
    function calcChecker1(digits: any) {
      let sum: number | null = null;

      for (let j = 0; j < 9; ++j) {
        sum += digits.toString().charAt(j) * (10 - j);
      }

      const lastSumChecker1 = sum % 11;

      return lastSumChecker1 < 2 ? 0 : 11 - lastSumChecker1;
    }

    function calcChecker2(cpfWithChecker1: any) {
      let sum: number | null = null;

      for (let k = 0; k < 10; ++k) {
        sum += cpfWithChecker1.toString().charAt(k) * (11 - k);
      }

      const lastSumChecker2 = sum % 11;

      return lastSumChecker2 < 2 ? 0 : 11 - lastSumChecker2;
    }

    const cleanCPF = value.replace(/\.|\-|\s/g, '');
    const firstNineDigits = cleanCPF.substring(0, 9);
    const checker = cleanCPF.substring(9, 11);

    if (cleanCPF.length !== 11) {
      return false;
    }

    // Checking if all digits are equal
    for (let i = 0; i < 10; i++) {
      if ('' + firstNineDigits + checker === Array(12).join(`${i}`)) {
        return false;
      }
    }

    const checker1 = calcChecker1(firstNineDigits);
    const checker2 = calcChecker2(firstNineDigits + '' + checker1);

    return checker.toString() === checker1.toString() + checker2.toString();
  }

  public static validateCnpj(value: string) {
    value = value.replace(/[^\d]+/g, '');

    if (value === '') {
      return false;
    }

    if (value.length !== 14) {
      return false;
    }

    // Elimina CNPJs invalidos conhecidos
    if (value === '00000000000000' ||
      value === '11111111111111' ||
      value === '22222222222222' ||
      value === '33333333333333' ||
      value === '44444444444444' ||
      value === '55555555555555' ||
      value === '66666666666666' ||
      value === '77777777777777' ||
      value === '88888888888888' ||
      value === '99999999999999') {
      return false;
    }

    // Valida DVs
    let tamanho = value.length - 2;
    let numeros = value.substring(0, tamanho);
    const digitos = value.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== parseInt(digitos.charAt(0), 10)) {
      return false;
    }

    tamanho = tamanho + 1;
    numeros = value.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

    return !(resultado !== parseInt(digitos.charAt(1), 10));
  }
}
