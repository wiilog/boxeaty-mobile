import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'values'
})
export class ValuesPipe implements PipeTransform {

    public transform(value: unknown, ..._args: unknown[]): unknown {
        return Object.values(value);
    }

}
