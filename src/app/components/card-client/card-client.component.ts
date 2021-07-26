import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'bx-card-client',
    templateUrl: './card-client.component.html',
    styleUrls: ['./card-client.component.scss'],
})
export class CardClientComponent implements OnInit {

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
        console.log(this.crateAmount, this.tokenAmount);
    }

}
