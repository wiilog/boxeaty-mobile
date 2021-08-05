import {Component} from '@angular/core';
import {ViewWillEnter} from '@ionic/angular';
import {Order} from "@app/entities/order";
import {NavService} from "@app/services/nav.service";
import {ToastService} from "@app/services/toast.service";
import {Form} from "@app/utils/form";

@Component({
    selector: 'app-delivery-sign',
    templateUrl: './delivery-sign.page.html',
    styleUrls: ['./delivery-sign.page.scss'],
})
export class DeliverySignPage implements ViewWillEnter {

    public order: Order;

    public form = Form.create({
        signature: Form.signature(true),
        photo: Form.photo(),
        comment: Form.textarea(),
        distance: Form.number(1, null, true),
    });

    public signature: string;
    public photo: string;

    constructor(private nav: NavService, private toast: ToastService) {
    }

    ionViewWillEnter() {
        this.order = this.nav.param<Order>(`order`);
    }

    saveAndBackToDeliveries() {
        const data = this.form.process();
        if(data) {
            console.log(data);
            //TODO: sauvegarder les données

            this.nav.pop(NavService.SELECT_DELIVERY);
        }
    }

    finish() {
        this.saveAndBackToDeliveries();
    }

    finishAndCollect() {
        this.nav.push(NavService.COLLECT_NEW, {
            callback: this.saveAndBackToDeliveries,
        })
    }

}
