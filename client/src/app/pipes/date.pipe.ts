import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

const options = { year: 'numeric', month: 'short', day: 'numeric' };

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return moment(value).format('Do MMM. YYYY');
  }

}
