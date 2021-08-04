import {Component, OnInit} from '@angular/core';
import {ViewWillEnter} from '@ionic/angular';
import {DeliveryRound} from "@app/entities/delivery-round";
import {NavService} from "@app/services/nav.service";
import {Order} from "@app/entities/order";

@Component({
    selector: 'app-pick-everything',
    templateUrl: './pick-everything.page.html',
    styleUrls: ['./pick-everything.page.scss'],
})
export class PickEverythingPage implements ViewWillEnter {

    public deliveryRound: DeliveryRound;

    public crates: Array<any>;

    constructor(private nav: NavService) {
        this.nav.readParams(params => {
            this.deliveryRound = params.deliveryRound;
            console.log(this.deliveryRound);
        });
    }

    ionViewWillEnter() {
        this.crates = this.deliveryRound.orders.flatMap((order: Order) => order.preparation.lines.map(line => ({
            order: order.id,
            ...line,
        })))

        console.log(this.crates);
    }

}
