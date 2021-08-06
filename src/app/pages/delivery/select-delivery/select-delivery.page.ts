import {Component, ViewChild, ElementRef} from '@angular/core';
import {ViewWillEnter, ViewDidEnter} from '@ionic/angular';
import {DeliveryRound} from "@app/entities/delivery-round";
import {NavService} from "@app/services/nav.service";
import {Platform} from '@ionic/angular';
import {Order} from "@app/entities/order";
import {Map} from "@app/utils/map";
import {ApiService} from "@app/services/api.service";

@Component({
    selector: 'app-select-delivery',
    templateUrl: './select-delivery.page.html',
    styleUrls: ['./select-delivery.page.scss'],
})
export class SelectDeliveryPage implements ViewWillEnter, ViewDidEnter {

    @ViewChild('map') mapView: ElementRef;
    private map: Map = null;

    public deliveryRound: DeliveryRound;

    constructor(private nav: NavService, private api: ApiService, private platform: Platform) {
    }

    ionViewWillEnter() {
        this.deliveryRound = this.nav.param<DeliveryRound>("deliveryRound");
        for (const order of this.deliveryRound.orders) {
            console.log(order.preparation.lines);
            order.taken = order.preparation.lines.filter(line => !line.taken).length === 0;
        }

        const ord = this.deliveryRound.order;
        this.deliveryRound.orders.sort((a, b) => ord[a.id] - ord[b.id]);

        for (const order of this.deliveryRound.orders) {
            order.order = ord[order.id];
        }
    }

    ionViewDidEnter() {
        if(this.map === null) {
            this.map = Map.create(`map`);

            for (const order of this.deliveryRound.orders) {
                this.map.addMarker({
                    title: order.client.name,
                    latitude: Number(order.client.latitude),
                    longitude: Number(order.client.longitude),
                })
            }

            this.map.fitBounds();
        }
    }

    public startDeposit(order: Order) {
        const loading = `Démarrage de la livraison`;

        this.api.request(ApiService.DELIVERY_START, {order: order.id}, loading).subscribe(() => {
            this.nav.push(NavService.DEPOSIT_BOXES, {
                order
            });
        })
    }

    public navigate(order: Order) {
        if (this.platform.is(`android`)) {
            window.location.href = `geo:0,0?q=${order.client.address}`;
        } else {
            window.location.href = `maps://maps.apple.com/?q=${order.client.address}`;
        }
    }

    public pickEverything() {
        this.nav.push(NavService.PICK_EVERYTHING, {
            deliveryRound: this.deliveryRound
        });
    }

}
