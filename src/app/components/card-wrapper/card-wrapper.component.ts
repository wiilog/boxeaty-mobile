import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-bx-card-wrapper',
  templateUrl: './card-wrapper.component.html',
  styleUrls: ['./card-wrapper.component.scss'],
})
export class CardWrapperComponent {

    @Input()
    public title: string;
}
