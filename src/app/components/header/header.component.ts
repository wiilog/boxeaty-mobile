import {Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import {Form} from '@app/utils/form';

@Component({
    selector: 'bx-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

    @ViewChild('wrapper')
    public wrapper: ElementRef;

    @Input()
    public subtitle: string;

    @Input()
    public border: boolean;

    @Input()
    public shadow: boolean|string;

    @Input()
    public options: Array<{label: string; value: string|number}> = undefined;

    @Output()
    public change = new EventEmitter<string|number>();

    public value: string|number = null;

    constructor() {
    }

    ngOnInit() {
    }

    get hasContent(): boolean {
        return this.wrapper && this.wrapper.nativeElement.childNodes.length > 0;
    }

    select(value: string|number) {
        this.value = value;

        if (this.change) {
            this.change.emit(value);
        }
    }

}
