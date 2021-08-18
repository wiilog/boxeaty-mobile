import {Component, OnInit} from '@angular/core';
import {ViewWillEnter} from "@ionic/angular";
import {ApiService} from "@app/services/api.service";
import {ToastService} from "@app/services/toast.service";
import {NavService} from "@app/services/nav.service";
import {Form} from "@app/utils/form";
import {Location} from "@app/entities/location";

@Component({
    selector: 'app-collect-new-details',
    templateUrl: './collect-new-details.page.html',
    styleUrls: ['./collect-new-details.page.scss'],
})
export class CollectNewDetailsPage implements ViewWillEnter, OnInit {

    public location: Location = undefined;
    public crates: Array<{ number: string, type: string }> = [];

    public form = Form.create({
        collectedTokens: Form.number(1, null, true),
    });

    constructor(private api: ApiService, private toast: ToastService, private nav: NavService) {
    }

    ngOnInit() {
    }

    public ionViewWillEnter() {
        const location = this.nav.param<number>('location');
        this.api.request(ApiService.LOCATION, {location},
            `Chargement des informations du point de collecte...`).subscribe((location) => {
            this.location = location;
        });
    }

    public scanCrate(number) {
        const index = this.crates.findIndex((c) => c.number === number);
        if (index === -1) {
            this.api.request(ApiService.BOX_INFORMATIONS, {box: number, isCrate: 1},
                `Récupération des informations de la caisse en cours...`).subscribe((result) => {
                if (result.success) {
                    const crate = result.data;
                    this.crates.push({number: crate.number, type: crate.type});
                } else {
                    this.toast.show(`La caisse <strong>${number}</strong> n'existe pas`)
                }
            });
        } else {
            this.toast.show(`La caisse <strong>${number}</strong> a déjà été scannée`)
        }
    }

    public delete(number) {
        const index = this.crates.findIndex((c) => c.number = number);
        this.crates.splice(index, 1);
        this.toast.show(`La caisse <strong>${number}</strong> a bien été supprimée`)
    }

    public next() {
        const data = this.form.process() as any;
        if(data) {
            this.nav.push(NavService.COLLECT_NEW_VALIDATE, {
                location: this.location,
                crates: this.crates,
                token_amount: data.collectedTokens
            });
        }
    }

}
