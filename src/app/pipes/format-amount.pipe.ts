import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatAmount'
})
export class FormatAmountPipe implements PipeTransform {

  transform(value: any): any {
    let amount = value.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
    let amountWithPoint = amount.split('').reverse().join('').replace(/^[\.]/,'');
    let amountFormat = '$' + amountWithPoint;
    return amountFormat;
  }

}
