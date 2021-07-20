import {Component, Input} from '@angular/core';

@Component({
  selector: 'bx-card-order-detail',
  templateUrl: './card-order-detail.component.html',
  styleUrls: ['./card-order-detail.component.scss'],
})
export class CardOrderDetailComponent {

    @Input()
    public title: string;
}
