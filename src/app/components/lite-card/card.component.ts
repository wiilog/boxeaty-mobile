import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-bxi-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

    @Input()
    public client: string;

    @Input()
    public crateAmount: number;

    @Input()
    public tokenAmount: number;

    @Input()
    public orderNumber: string;

  constructor() { }

  ngOnInit() {}

}
