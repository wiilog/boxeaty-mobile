import {Component, OnInit} from '@angular/core';
import {Location} from "@app/entities/location";
import {Form} from "@app/utils/form";
import {ViewWillEnter} from "@ionic/angular";
import {NavService} from "@app/services/nav.service";
import {ApiService} from "@app/services/api.service";
import {ToastService} from "@app/services/toast.service";

@Component({
    selector: 'app-collect-new-validate',
    templateUrl: './collect-new-validate.page.html',
    styleUrls: ['./collect-new-validate.page.scss'],
})
export class CollectNewValidatePage implements ViewWillEnter, OnInit {

    public location: Location = undefined;
    public crates: Array<{ number: string, type: string }> = [];

    public tokenAmount: number;

    public form = Form.create({
        signature: Form.signature(true),
        photo: Form.photo(),
        comment: Form.textarea(),
    });

    constructor(private nav: NavService, private api: ApiService, private toast: ToastService) {
    }

    ngOnInit() {
    }

    public ionViewWillEnter() {
        this.location = this.nav.param<Location>('location')
        this.crates = this.nav.param<Array<{ number: string, type: string }>>('crates');
        this.tokenAmount = this.nav.param<number>('token_amount');
    }

    public validate() {
        const data = this.form.process() as any;

        if (data) {
            this.api.request(ApiService.COLLECT_NEW_VALIDATE, {
                data: data,
                location: this.location,
                crates: this.crates,
                token_amount: this.tokenAmount
            }, `Validation de la collecte en cours...`).subscribe(() => {
                this.nav.pop(NavService.COLLECTS);
            });
        }
    }

}
