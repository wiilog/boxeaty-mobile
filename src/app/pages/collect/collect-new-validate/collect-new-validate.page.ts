import {Component} from '@angular/core';
import {Location} from '@app/entities/location';
import {Form} from '@app/utils/form';
import {ViewWillEnter} from '@ionic/angular';
import {NavService} from '@app/services/nav.service';
import {ApiService} from '@app/services/api.service';

@Component({
    selector: 'app-collect-new-validate',
    templateUrl: './collect-new-validate.page.html',
    styleUrls: ['./collect-new-validate.page.scss'],
})
export class CollectNewValidatePage implements ViewWillEnter {

    public location: Location = undefined;
    public crates: Array<{ number: string, type: string }> = [];
    public tokenAmount: number;
    public order?: number;

    public form = Form.create({
        signature: Form.signature(true),
        photo: Form.photo(),
        comment: Form.textarea(),
    });

    public constructor(private nav: NavService, private api: ApiService) {
    }

    public ionViewWillEnter() {
        this.order = this.nav.param<number>('order');
        this.location = this.nav.param<Location>('location');
        this.crates = this.nav.param<Array<{ number: string, type: string }>>('crates');
        this.tokenAmount = this.nav.param<number>('token_amount');
    }

    public validate() {
        const data = this.form.process() as any;

        if (data) {
            const apiParams: any = {
                data,
                location: this.location,
                crates: this.crates,
                token_amount: this.tokenAmount
            };

            if (this.order) {
                apiParams.clientOrder = this.order;
            }

            this.api.request(ApiService.CREATE_COLLECT, apiParams, `Validation de la collecte`).subscribe(() => {
                if (this.order) {
                    this.nav.pop(NavService.SELECT_DELIVERY);
                } else {
                    this.nav.pop(NavService.COLLECT_LIST);
                }
            });
        }
    }

}
