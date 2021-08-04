import {Component, Input, OnInit} from '@angular/core';

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

    constructor() {
    }

    ngOnInit() {
    }

}
