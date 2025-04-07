import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
  standalone: true
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number | null | undefined, symbol: string = '$'): string {
    if (value === null || value === undefined || isNaN(value)) {
      return `${symbol}0.00`;
    }
    return `${symbol}${value.toFixed(2)}`;
  }
} 