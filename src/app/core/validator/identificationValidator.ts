import { AbstractControl, ValidatorFn } from '@angular/forms';


export function cedulaValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const cedula: string = control.value.replace(/-/g, '');
      
  
      if (cedula === null || cedula === undefined || cedula === '') {
        return null;
      }
  
      if (cedula.length !== 10) {
        return { 'invalidLength': true };
      }
  
      if (!/^\d+$/.test(cedula)) {
        return { 'invalidFormat': true };
      }
  
      const digitoVerificador = Number(cedula.charAt(9));
      let suma = 0;
      for (let i = 0; i < 9; i++) {
        let digito = Number(cedula.charAt(i));
        if (i % 2 === 0) {
          digito *= 2;
          if (digito > 9) {
            digito -= 9;
          }
        }
        suma += digito;
      }
      const modulo = suma % 10;
      const decenaSuperior = 10 - modulo;
  
      if ((modulo === 0 && digitoVerificador !== 0) || (modulo !== 0 && decenaSuperior !== digitoVerificador)) {
        return { 'invalidCedula': true };
      }
  
      return null;
    };
  }
  