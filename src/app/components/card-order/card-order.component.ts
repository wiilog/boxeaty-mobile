import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'bx-card-order',
  templateUrl: './card-order.component.html',
  styleUrls: ['./card-order.component.scss'],
})
export class CardOrderComponent implements OnInit {

    @Input()
    public client: string;

    @Input()
    public crateAmount: number;

    @Input()
    public tokenAmount: number;

    @Input()
    public orderNumber: string;

    @Input()
    public operator: string;

  constructor() { }

  ngOnInit() {}

}
