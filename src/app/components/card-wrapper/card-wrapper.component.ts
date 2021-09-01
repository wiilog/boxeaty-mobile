import {Component, Output, EventEmitter, Input} from '@angular/core';

@Component({
    selector: 'bx-card-wrapper',
    templateUrl: './card-wrapper.component.html',
    styleUrls: ['./card-wrapper.component.scss'],
})
export class CardWrapperComponent {

    @Input()
    public disabled: boolean;

    @Input()
    public rightTitle: string;

    @Input()
    public leftTitle: string;

    @Input()
    public hideTitle: boolean;

    @Output()
    public click = new EventEmitter<void>();

    public handleClick(event) {
        if(!this.disabled) {
            this.click.emit();
        } else {
            event.stopPropagation();
        }
    }

}
