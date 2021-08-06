import {Component} from '@angular/core';
import {ViewWillEnter, ViewWillLeave} from '@ionic/angular';
import {DeliveryRound} from "@app/entities/delivery-round";
import {NavService} from "@app/services/nav.service";
import {Order} from "@app/entities/order";
import {ToastService} from "@app/services/toast.service";

@Component({
    selector: 'app-pick-everything',
    templateUrl: './pick-everything.page.html',
    styleUrls: ['./pick-everything.page.scss'],
})
export class PickEverythingPage implements ViewWillEnter, ViewWillLeave {

    public deliveryRound: DeliveryRound;

    public crates: Array<{ order: number, crate: string, boxes: Array<{ number: string }>, taken: boolean }>;
    public finished: boolean = false;

    constructor(private nav: NavService, private toast: ToastService) {
    }

    ionViewWillEnter() {
        this.deliveryRound = this.nav.param<DeliveryRound>("deliveryRound");
        this.crates = this.deliveryRound.orders.flatMap((order: Order) => order.preparation.lines.map(line => ({
            order: order.id,
            taken: line.taken,
            ...line,
        })));

        this.finished = this.crates.filter(crate => !crate.taken).length === 0;
    }

    ionViewWillLeave() {
        for (const order of this.deliveryRound.orders) {
            let count = 0;

            for (const crate of this.crates.filter(crate => crate.order == order.id)) {
                for (const line of order.preparation.lines.filter(line => crate.crate === line.crate)) {
                    line.taken = crate.taken;
                    if (line.taken) {
                        count++;
                    }
                }
            }

            order.taken = count === order.preparation.lines.length;
        }
    }

    scanCrate(number: string) {
        const crate = this.crates.find(crate => crate.crate === number);
        if (crate && !crate.taken) {
            crate.taken = true;
        } else if (crate && crate.taken) {
            this.toast.show(`Cette caisse a déjà été prise`);
        } else {
            this.toast.show(`Cette caisse ne fait pas partie de la livraison`);
        }

        this.finished = this.crates.filter(crate => !crate.taken).length === 0;
    }

    finish() {
        this.nav.pop();
    }

}
