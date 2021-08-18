import {Component, Input} from '@angular/core';

@Component({
    selector: 'bx-card-order',
    templateUrl: './card-order.component.html',
    styleUrls: ['./card-order.component.scss'],
})
export class CardOrderComponent {

    @Input()
    public client: string;

    @Input()
    public crateAmount: number;

    @Input()
    public tokenAmount: number;

    @Input()
    public orderNumber: string;

    @Input()
    public operator: string;

}
