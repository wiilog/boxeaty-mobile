import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'length'
})
export class LengthPipe implements PipeTransform {

    transform(value: any, ...args: unknown[]): unknown {
        return Object.keys(value).length;
    }

}
