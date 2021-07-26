import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import {DeliveryRound} from "@app/entities/delivery-round";
import {NavService} from "@app/services/nav.service";

@Component({
    selector: 'app-select-delivery',
    templateUrl: './select-delivery.page.html',
    styleUrls: ['./select-delivery.page.scss'],
})
export class SelectDeliveryPage implements OnInit {

    public deliveryRound: DeliveryRound;

    constructor(private nav: NavService) {
        this.nav.readParams(params => {
            this.deliveryRound = params.deliveryRound;
            console.log(this.deliveryRound);
        });
    }

    ngOnInit() {
    }

}
