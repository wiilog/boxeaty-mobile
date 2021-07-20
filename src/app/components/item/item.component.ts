import {Component, Input} from '@angular/core';

@Component({
  selector: 'bx-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {

    @Input()
    public label: string;
}
