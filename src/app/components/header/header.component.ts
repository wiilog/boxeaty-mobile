import {Component, AfterViewInit, ChangeDetectorRef, Input, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';

@Component({
    selector: 'bx-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements AfterViewInit {

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

    public hasContent: boolean = false;

    public value: string|number = null;

    constructor(private detector: ChangeDetectorRef) {
    }

    public ngAfterViewInit() {
        this.hasContent = this.wrapper && this.wrapper.nativeElement.childNodes.length > 0;
        this.detector.detectChanges();
    }

    public select(value: string|number) {
        this.value = value;

        if (this.change) {
            this.change.emit(value);
        }
    }

}
