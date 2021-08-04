import {Component, OnInit, OnDestroy, ViewChild, ElementRef, } from '@angular/core';
import {ViewWillEnter, ViewWillLeave} from '@ionic/angular';
import {DeliveryRound} from "@app/entities/delivery-round";
import {NavService} from "@app/services/nav.service";
import {CapacitorGoogleMaps} from '@capacitor-community/capacitor-googlemaps-native';

@Component({
    selector: 'app-select-delivery',
    templateUrl: './select-delivery.page.html',
    styleUrls: ['./select-delivery.page.scss'],
})
export class SelectDeliveryPage implements OnInit, ViewWillEnter, ViewWillLeave {

    @ViewChild('map') mapView: ElementRef;

    public deliveryRound: DeliveryRound;

    constructor(private nav: NavService) {
        this.nav.readParams(params => {
            this.deliveryRound = params.deliveryRound;
        });
    }


    ngOnInit() {
    }

    public pickEverything() {
        this.nav.push(NavService.PICK_EVERYTHING, {
            deliveryRound: this.deliveryRound,
        });
    }

    async ionViewWillEnter() {
        const boundingRect = this.mapView.nativeElement.getBoundingClientRect() as DOMRect;
        const clients: Array<{latitude: number, longitude: number, title: string}> = [];

        for(const order of this.deliveryRound.orders) {
            clients.push({
                latitude: Number(order.client.latitude),
                longitude: Number(order.client.longitude),
                title: order.client.name,
            });
        }

        CapacitorGoogleMaps.create({
            width: Math.round(boundingRect.width),
            height: Math.round(boundingRect.height),
            x: Math.round(boundingRect.x),
            y: Math.round(boundingRect.y),
            latitude: clients[0].latitude,
            longitude: clients[0].longitude,
            zoom: 8
        });

        CapacitorGoogleMaps.addListener("onMapReady", async () => {
            for(const marker of clients) {
                CapacitorGoogleMaps.addMarker(marker);
            }

            CapacitorGoogleMaps.setMapType({
                type: "normal"
            })
        })
    }


    ionViewWillLeave() {
        CapacitorGoogleMaps.close();
    }

}
