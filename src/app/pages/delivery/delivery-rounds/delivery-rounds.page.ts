import {Component} from '@angular/core';
import {formatDate} from '@angular/common';
import {ApiService} from '@app/services/api.service';
import {DeliveryRound} from '@app/entities/delivery-round';
import {NavService} from '@app/services/nav.service';
import {ViewWillEnter} from '@ionic/angular';

@Component({
    selector: 'app-delivery-rounds',
    templateUrl: './delivery-rounds.page.html',
    styleUrls: ['./delivery-rounds.page.scss'],
})
export class DeliveryRoundsPage implements ViewWillEnter {

    public deliveryRounds: { [key: string]: Array<DeliveryRound> };

    constructor(private api: ApiService, private nav: NavService) {
    }

    public ionViewWillEnter(): void {
        this.api.request(ApiService.AVAILABLE_DELIVERY_ROUNDS, null, ApiService.LOADING_DELIVERIES).subscribe(result => {
            this.deliveryRounds = result;

            for(const rounds of Object.values(this.deliveryRounds)) {
                for(const round of rounds) {
                    round.joined_clients = round.orders.map(order => order.client.name).join(', ');
                }
            }
        });
    }

    public selectDeliveryRound(round: DeliveryRound) {
        this.nav.push(NavService.SELECT_DELIVERY, {
            deliveryRound: round,
        });
    }

    public formatSection(stringDate: string = null) {
        const day = 1000 * 60 * 60 * 24;
        const date = stringDate ? new Date(Date.parse(stringDate)) : new Date();

        const today = new Date();
        if(date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
            return `Aujourd'hui <span class="silent">${formatDate(date, `d MMMM`, `fr`)}</span>`;
        }

        const tomorrow = new Date(today.getTime() + day);
        if(date.getDate() === tomorrow.getDate() && date.getMonth() === tomorrow.getMonth() && date.getFullYear() === tomorrow.getFullYear()) {
            return `Demain <span class="silent">${formatDate(date, `d MMMM`, `fr`)}</span>`;
        }

        return formatDate(date, `EEEE d MMMM`, `fr`)
    }

}
