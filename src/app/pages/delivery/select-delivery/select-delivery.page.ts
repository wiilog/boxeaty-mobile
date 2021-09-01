import {Component, ViewChild, ElementRef} from '@angular/core';
import {ViewWillEnter, ViewDidEnter} from '@ionic/angular';
import {DeliveryRound} from '@app/entities/delivery-round';
import {NavService} from '@app/services/nav.service';
import {Platform} from '@ionic/angular';
import {Order} from '@app/entities/order';
import {Map} from '@app/utils/map';
import {ApiService} from '@app/services/api.service';

@Component({
    selector: 'app-select-delivery',
    templateUrl: './select-delivery.page.html',
    styleUrls: ['./select-delivery.page.scss'],
})
export class SelectDeliveryPage implements ViewWillEnter, ViewDidEnter {

    public deliveryRound: DeliveryRound;
    public currentOrder: number = null;
    public everythingTaken: boolean = true;

    @ViewChild('map')
    public mapView: ElementRef;
    private map: Map = null;

    constructor(private nav: NavService, private api: ApiService, private platform: Platform) {
    }

    public ionViewWillEnter() {
        this.deliveryRound = this.nav.param<DeliveryRound>('deliveryRound');
        this.currentOrder = null;
        for (const order of this.deliveryRound.orders) {
            order.taken = order.preparation.lines.filter(line => !line.taken).length === 0;
            if(this.currentOrder === null && order.taken && !order.delivered) {
                this.currentOrder = order.id;
            }
        }

        const ord = this.deliveryRound.order;
        this.deliveryRound.orders.sort((a, b) => ord[a.id] - ord[b.id]);

        this.everythingTaken = true;
        for (const order of this.deliveryRound.orders) {
            order.order = ord[order.id] + 1;
            this.everythingTaken &&= order.taken;
        }
    }

    public ionViewDidEnter() {
        if (this.map === null) {
            this.map = Map.create(`map`);

            for (const order of this.deliveryRound.orders) {
                this.map.addMarker({
                    title: `${order.order}. ${order.client.name}`,
                    latitude: Number(order.client.latitude),
                    longitude: Number(order.client.longitude),
                });
            }

            this.map.fitBounds();
        }
    }

    public pickEverything() {
        this.nav.push(NavService.PICK_EVERYTHING, {
            deliveryRound: this.deliveryRound
        });
    }

    public startDeposit(order: Order) {
        const loading = `Démarrage de la livraison`;

        this.api.request(ApiService.DELIVERY_START, {order: order.id}, loading).subscribe(() => {
            this.nav.push(NavService.DEPOSIT_BOXES, {
                order
            });
        });
    }

    public navigate(order: Order) {
        if (this.platform.is(`android`)) {
            window.location.href = `geo:0,0?q=${order.client.address}`;
        } else {
            window.location.href = `maps://maps.apple.com/?q=${order.client.address}`;
        }
    }

}
