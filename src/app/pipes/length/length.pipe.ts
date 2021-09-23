import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'length'
})
export class LengthPipe implements PipeTransform {

    public transform(value: any, ..._args: unknown[]): unknown {
        return Object.keys(value).length;
    }

}
