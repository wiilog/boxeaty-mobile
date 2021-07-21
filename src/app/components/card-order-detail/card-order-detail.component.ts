import {Component, Input} from '@angular/core';

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
    public round: string;

    @Input()
    public crateAmount: number;

    @Input()
    public tokenAmount: number;
}
