import {Component, OnInit} from '@angular/core';
import {ViewWillEnter} from "@ionic/angular";
import {ApiService} from "@app/services/api.service";
import {Collect} from "@app/entities/collect";
import {Form} from "@app/utils/form";
import {NavService} from "@app/services/nav.service";
import {ToastService} from "@app/services/toast.service";

@Component({
    selector: 'app-collect-validate',
    templateUrl: './collect-validate.page.html',
    styleUrls: ['./collect-validate.page.scss'],
})
export class CollectValidatePage implements ViewWillEnter, OnInit {

    public collect: Collect = undefined;
    public selectedLocation = null;

    readonly LOCATION_SELECTABLE = 'location';

    public form = Form.create({
        signature: Form.signature(true),
        photo: Form.photo(),
        comment: Form.textarea(),
    });

    constructor(private api: ApiService, private nav: NavService, private toast: ToastService) {
    }

    ngOnInit() {
    }

    public ionViewWillEnter() {
        this.collect = this.nav.param<Collect>('collect');
    }

    public validate() {
        const data = this.form.process() as any;
        if(this.selectedLocation) {
            if (data) {
                this.api.request(ApiService.COLLECT_VALIDATE, {
                    data,
                    drop_location: this.selectedLocation.id,
                    collect: this.collect.id,
                    token_amount: this.collect.token_amount
                }, `Validation de la collecte en cours...`).subscribe(() => {
                    this.nav.pop(NavService.COLLECTS);
                });
            }
        } else {
            this.toast.show(`Le point de dépose est obligatoire`);
        }
    }

}
