import {Component} from '@angular/core';
import {ViewWillEnter} from '@ionic/angular';
import {Order} from '@app/entities/order';
import {NavService} from '@app/services/nav.service';
import {Form} from '@app/utils/form';
import {ApiService} from '@app/services/api.service';

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

    constructor(private nav: NavService, private api: ApiService) {
    }

    public ionViewWillEnter() {
        this.order = this.nav.param<Order>(`order`);
        this.form.get(`comment`).setValue(this.order.comment);
    }

    public saveAndBackToDeliveries(collectRedirection?: () => void): void {
        const data = this.form.process() as any;
        if (data) {
            data.order = this.order.id;

            this.api.request(ApiService.DELIVERY_FINISH, data).subscribe(() => {
                this.order.delivered = true;
                this.nav.pop(NavService.SELECT_DELIVERY)
                    .subscribe(() => {
                        if (collectRedirection) {
                            this.nav.push(NavService.COLLECT_NEW_PICK_LOCATION, {
                                order: this.order.id
                            });
                        }
                    });
            });
        }
    }

    public finish() {
        this.saveAndBackToDeliveries();
    }

    public finishAndCollect() {
        this.nav.push(NavService.COLLECT_NEW, {
            callback: this.saveAndBackToDeliveries,
        });
    }

}
