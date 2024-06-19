import { AbstractControl, ValidatorFn } from '@angular/forms';

export function rucValidator(): ValidatorFn {  
  return (control: AbstractControl): { [key: string]: any } | null => {
    const ruc: string = control.value;

    if (ruc === null || ruc === undefined || ruc === '') {
      return null;
    }

    if (ruc.length !== 13) {
      return { 'invalidLength': true };
    }

    if (!/^\d+$/.test(ruc)) {
      return { 'invalidFormat': true };
    }

    const tipoDocumento = Number(ruc.substring(0, 2));
    if (tipoDocumento < 1 || tipoDocumento > 24) {
      return { 'invalidTipoDocumento': true };
    }

    const digitoTres = Number(ruc.charAt(2));
    if (digitoTres < 0 || digitoTres > 5) {
      return { 'invalidDigitoTres': true };
    }

    const digitoVerificador = Number(ruc.charAt(9));
    let suma = 0;
    const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    
    for (let i = 0; i < 9; i++) {
      let valor = Number(ruc.charAt(i)) * coeficientes[i];
      suma += (valor > 9) ? valor - 9 : valor;
    }

    let modulo = suma % 10;
    if (modulo !== 0) {
      modulo = 10 - modulo;
    }

    if (modulo !== digitoVerificador) {
      return { 'invalidDigitoVerificador': true };
    }

    return null;
  };
}
