import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'values'
})
export class ValuesPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return Object.values(value);
  }

}
