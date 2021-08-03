import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'entries'
})
export class EntriesPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return Object.entries(value);
  }

}
