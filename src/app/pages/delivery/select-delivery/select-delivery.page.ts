import {Component, ViewChild, ElementRef} from '@angular/core';
import {ViewWillEnter, ViewDidEnter} from '@ionic/angular';
import {DeliveryRound} from "@app/entities/delivery-round";
import {NavService} from "@app/services/nav.service";
import {Platform} from '@ionic/angular';
import {Order} from "@app/entities/order";
import {Map} from "@app/utils/map";

@Component({
    selector: 'app-select-delivery',
    templateUrl: './select-delivery.page.html',
    styleUrls: ['./select-delivery.page.scss'],
})
export class SelectDeliveryPage implements ViewWillEnter, ViewDidEnter {

    @ViewChild('map') mapView: ElementRef;

    public deliveryRound: DeliveryRound;

    constructor(private nav: NavService, private platform: Platform) {
    }

    public pickEverything() {
        this.nav.push(NavService.PICK_EVERYTHING, {
            deliveryRound: this.deliveryRound,
            callback: (crates: Array<{order: number, crate: string, boxes: Array<{number: string}>, taken: boolean}>) => {
                for(const order of this.deliveryRound.orders) {
                    let count = 0;

                    for(const crate of crates.filter(crate => crate.order == order.id)) {
                        for(const line of order.preparation.lines.filter(line => crate.crate === line.crate)) {
                            line.taken = crate.taken;
                            if(line.taken) {
                                count++;
                            }
                        }
                    }

                    order.taken = count === order.preparation.lines.length;
                }
            }
        });
    }

    ionViewWillEnter() {
        this.deliveryRound = this.nav.param<DeliveryRound>("deliveryRound");
    }

    ionViewDidEnter() {
        const map = Map.create(`map`);

        for (const order of this.deliveryRound.orders) {
            map.addMarker({
                title: order.client.name,
                latitude: Number(order.client.latitude),
                longitude: Number(order.client.longitude),
            })
        }

        map.fitBounds();
    }

    public navigate(order: Order) {
        if (this.platform.is(`android`)) {
            window.location.href = `geo:0,0?q=${order.client.address}`;

        } else {
            window.location.href = `maps://maps.apple.com/?q=${order.client.address}`;
        }
    }

}
