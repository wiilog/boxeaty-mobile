import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'bx-empty',
    templateUrl: './empty.component.html',
    styleUrls: ['./empty.component.scss'],
})
export class EmptyComponent implements OnInit {

    @Input()
    public label;

    @Input()
    public icon;

    constructor() {
    }

    ngOnInit() {
    }

}
