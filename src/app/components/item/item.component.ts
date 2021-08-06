import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'bx-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss'],
})
export class ItemComponent {

    @Input()
    public leftLabel: string;

    @Input()
    public rightLabel: string;

    @Input()
    public bolderLeftLabel: boolean;

    @Input()
    public bolderRightLabel: boolean;

    @Input()
    public border: boolean;

    @Input()
    public icon: string;

    @Input()
    public subtitle: boolean;

    @Output()
    public action = new EventEmitter<void>();

    onImageClick() {
        if (this.action) {
            this.action.emit();
        }
    }
}
