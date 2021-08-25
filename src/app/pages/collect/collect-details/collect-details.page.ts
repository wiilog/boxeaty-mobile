import {Component} from '@angular/core';
import {ViewWillEnter} from '@ionic/angular';
import {ApiService} from '@app/services/api.service';
import {NavService} from '@app/services/nav.service';
import {Collect} from '@app/entities/collect';
import {Form} from '@app/utils/form';

@Component({
    selector: 'app-collect-details',
    templateUrl: './collect-details.page.html',
    styleUrls: ['./collect-details.page.scss'],
})
export class CollectDetailsPage implements ViewWillEnter {

    public collect: Collect = undefined;

    public crates: Array<{ number: string; type: string }>;

    public form = Form.create({
        collectedTokens: Form.number(0, null, true),
    });

    public constructor(private api: ApiService, private nav: NavService) {
    }

    public ionViewWillEnter() {
        this.collect = this.nav.param<Collect>('collect');
        this.api
            .request(ApiService.COLLECT_CRATES, {collect: this.collect.id}, `Récupération des caisses`)
            .subscribe((crates) => {
                this.crates = crates;
            });
    }

    public next() {
        const data = this.form.process() as any;
        if (data) {
            this.collect.token_amount = data.collectedTokens;
            this.nav.push(NavService.COLLECT_VALIDATE, {collect: this.collect});
        }
    }

}
