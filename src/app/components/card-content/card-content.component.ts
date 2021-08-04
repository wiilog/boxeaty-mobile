import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'bx-card-content',
    templateUrl: './card-content.component.html',
    styleUrls: ['./card-content.component.scss'],
})
export class CardContentComponent implements OnInit {

    @Input()
    public direction: string;

    @Input()
    public crateAmount: number;

    @Input()
    public tokenAmount: number;

    constructor() {
    }

    ngOnInit() {
    }

}
