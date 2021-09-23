import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'entries'
})
export class EntriesPipe implements PipeTransform {

    public transform(value: unknown, ..._args: unknown[]): unknown {
        return Object.entries(value);
    }

}
