import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export function pasaporteValidator(): ValidatorFn {
  const pattern = /^[A-Z0-9]{6,12}$/;

  return (control: AbstractControl): {[key: string]: any} | null => {
    const isValid = pattern.test(control.value);
    return isValid ? null : { 'pasaporteInvalido': { value: control.value } };
  };
}
