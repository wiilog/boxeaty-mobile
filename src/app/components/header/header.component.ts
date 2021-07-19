import {Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import {Form} from "@app/utils/form";

@Component({
    selector: 'bxi-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

    public readonly NO_OPTIONS = "Wittjwk_@S5LDHwG+E%0pi-/zWEn(9u+";

    @ViewChild('wrapper') wrapper: ElementRef;

    @Input()
    public border: boolean;

    @Input()
    public shadow: boolean;

    @Input()
    public options: Array<{label: string, value: string|number}>|string = this.NO_OPTIONS;

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
