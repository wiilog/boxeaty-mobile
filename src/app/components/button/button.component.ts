import {Component, Input} from '@angular/core';

@Component({
  selector: 'bx-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {

    @Input()
    public label: string;

    @Input()
    public icon: string;
}
