import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';

@Component({
    selector: 'bx-card-delivery',
    templateUrl: './card-delivery.component.html',
    styleUrls: ['./card-delivery.component.scss'],
})
export class CardDeliveryComponent implements OnInit {

    @Input()
    public title: string;

    @Input()
    public name: string;

    @Input()
    public address: string;

    @Input()
    public deliverer: string;

    @Input()
    public phoneNumber: string;

    @Input()
    public crateAmount: number;

    @Input()
    public tokenAmount: number;

    @Input()
    public disabled: boolean;

    @Input()
    public canNavigate: boolean;

    @Output()
    public click = new EventEmitter<void>();

    @Output()
    public navigate = new EventEmitter<void>();

    constructor() {
    }

    ngOnInit() {
    }

    handleClick(event) {
        if(this.disabled) {
            event.stopPropagation();
        }
    }

}
