import {Component, Input} from '@angular/core';

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
}
