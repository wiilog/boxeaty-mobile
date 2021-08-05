import {Component} from '@angular/core';
import {ViewWillEnter, ViewWillLeave} from '@ionic/angular';
import {DeliveryRound} from "@app/entities/delivery-round";
import {NavService} from "@app/services/nav.service";
import {Order} from "@app/entities/order";

@Component({
    selector: 'app-pick-everything',
    templateUrl: './pick-everything.page.html',
    styleUrls: ['./pick-everything.page.scss'],
})
export class PickEverythingPage implements ViewWillEnter, ViewWillLeave {

    public deliveryRound: DeliveryRound;
    private callback: (crates: Array<any>) => void;

    public crates: Array<{order: number, crate: string, boxes: Array<{number: string}>, taken: boolean}>;

    constructor(private nav: NavService) {
    }

    ionViewWillEnter() {
        this.deliveryRound = this.nav.param<DeliveryRound>("deliveryRound");
        this.callback = this.nav.param("callback");
        this.crates = this.deliveryRound.orders.flatMap((order: Order) => order.preparation.lines.map(line => ({
            order: order.id,
            taken: line.taken,
            ...line,
        })));
    }

    ionViewWillLeave() {
        this.callback(this.crates);
    }

    scanCrate(number: string) {
        const crate = this.crates.find(crate => crate.crate === number);
        crate.taken = true;
    }

    finish() {
        this.nav.pop();
    }

}
