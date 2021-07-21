import {Component, OnInit} from '@angular/core';
import {formatDate} from '@angular/common';
import {ApiService} from "@app/services/api.service";
import {DeliveryRound} from "@app/entities/delivery-round";
import {NavService} from "@app/services/nav.service";

@Component({
    selector: 'app-delivery-rounds',
    templateUrl: './delivery-rounds.page.html',
    styleUrls: ['./delivery-rounds.page.scss'],
})
export class DeliveryRoundsPage implements OnInit {

    private deliveryRounds: {[key: string]: DeliveryRound};

    constructor(private api: ApiService, private nav: NavService) {
    }

    ngOnInit() {
        this.api.request(ApiService.AVAILABLE_DELIVERY_ROUNDS).subscribe(result => {
            this.deliveryRounds = result;
        });
    }

    selectDeliveryRound(round: DeliveryRound) {
        this.nav.push(NavService.SELECT_DELIVERY, {
            deliveryRound: round,
        });
    }

    formatSection(stringDate) {
        const day = 1000 * 60 * 60 * 24;
        const date = new Date(Date.parse(stringDate));

        const today = new Date();
        if(date.getDate() == today.getDate() && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear()) {
            return `Aujourd'hui <span class="silent">${formatDate(date, `d MMMM`, `fr`)}</span>`;
        }

        const tomorrow = new Date(today.getTime() + day);
        if(date.getDate() == tomorrow.getDate() && date.getMonth() == tomorrow.getMonth() && date.getFullYear() == tomorrow.getFullYear()) {
            return `Demain <span class="silent">${formatDate(date, `d MMMM`, `fr`)}</span>`;
        }

        return formatDate(date, `EEEE d MMMM`, `fr`)
    }

}
