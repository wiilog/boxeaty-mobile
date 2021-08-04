import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'bx-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {

    @Input()
    public label: string;

    @Input()
    public bolderLabel: boolean;

    @Input()
    public border: boolean;

    @Input()
    public circle: string;

    @Input()
    public icon: string;

    @Output()
    public action = new EventEmitter<void>();

    onImageClick() {
        if (this.action) {
            this.action.emit();
        }
    }
}
