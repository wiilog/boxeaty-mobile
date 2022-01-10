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

    public today: string;
    public anyDeliveries: boolean = false;
    public deliveryRounds: { [key: string]: Array<DeliveryRound> };

    constructor(private api: ApiService, private nav: NavService) {
    }

    public ionViewWillEnter(event = null): void {
        const today = new Date();
        this.today = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

        this.api.request(ApiService.AVAILABLE_DELIVERY_ROUNDS, null, !event ? ApiService.LOADING_DELIVERIES : null).subscribe(result => {
            this.deliveryRounds = result;
            this.anyDeliveries = Boolean(Object.keys(this.deliveryRounds).length);

            if(event) {
                event.target.complete();
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
            return `Aujourd'hui ${formatDate(date, `d MMMM`, `fr`)}`;
        }

        const tomorrow = new Date(today.getTime() + day);
        if(date.getDate() === tomorrow.getDate() && date.getMonth() === tomorrow.getMonth() && date.getFullYear() === tomorrow.getFullYear()) {
            return `Demain ${formatDate(date, `d MMMM`, `fr`)}`;
        }

        return formatDate(date, `EEEE d MMMM`, `fr`);
    }

}
