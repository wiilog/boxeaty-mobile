import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'bx-card-order-detail',
    templateUrl: './card-order-detail.component.html',
    styleUrls: ['./card-order-detail.component.scss'],
})
export class CardOrderDetailComponent {

    @Input()
    public disabled: boolean;

    @Input()
    public title: string;

    @Input()
    public status: string;

    @Input()
    public label: string;

    @Input()
    public number: string;

    @Input()
    public crateAmount: number;

    @Input()
    public tokenAmount: number;

    @Output()
    public click = new EventEmitter<void>();

    public handleClick(event: Event) {
        if(!this.disabled) {
            this.click.emit();
        } else {
            event.stopPropagation();
        }
    }

}
