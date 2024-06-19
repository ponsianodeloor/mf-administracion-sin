import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetterCapitalize',
  standalone: true
})
export class FirstLetterEachWordCapitalizedPipe implements PipeTransform {
  transform(value: string): string {
    
    if (!value) return '';
    return value.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  }
}
