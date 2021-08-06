import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'bx-card-content',
    templateUrl: './card-content.component.html',
    styleUrls: ['./card-content.component.scss'],
})
export class CardContentComponent implements OnInit {

    @Input()
    public direction: string = `vertical`;

    @Input()
    public center: boolean = true;

    @Input()
    public crateAmount: number;

    @Input()
    public tokenAmount: number;

    constructor() {
    }

    ngOnInit() {
        if(this.direction === `horizontal`) {
            this.direction = `row`;
        } else if(this.direction === `vertical`) {
            this.direction = `column`;
        }
    }

}
