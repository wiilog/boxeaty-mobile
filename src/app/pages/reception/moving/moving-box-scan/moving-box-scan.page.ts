import {Component, OnInit} from '@angular/core';
import {ViewWillEnter} from "@ionic/angular";
import {ApiService} from "@app/services/api.service";
import {ToastService} from "@app/services/toast.service";
import {NavService} from "@app/services/nav.service";

@Component({
    selector: 'app-moving-box-scan',
    templateUrl: './moving-box-scan.page.html',
    styleUrls: ['./moving-box-scan.page.scss'],
})
export class MovingBoxScanPage implements ViewWillEnter, OnInit {

    public scannedBoxesAndCrates: Array<{ number: string; type: string }> = [];

    constructor(private api: ApiService, private toastService: ToastService,
                private nav: NavService) {
    }

    public ionViewWillEnter() {
    }

    public ngOnInit() {
    }

    public scan(object) {
        const index = this.scannedBoxesAndCrates.findIndex((o) => o.number === object);
        if(index === -1) {
            this.api.request(ApiService.BOX_INFORMATIONS, {
                box: object
            }, 'Ajout de la Box/caisse').subscribe((result) => {
                const number = result.data.number;
                const type = result.data.type;
                if(number && type) {
                    this.scannedBoxesAndCrates.push({number, type});
                } else {
                    this.toastService.show(`Cette Box / Caisse n'existe pas`);
                }
            });
        } else {
            this.toastService.show(`Cette Box / Caisse a déjà été scannée`);
        }
    }

    public next() {
        this.nav.push(NavService.MOVING_BOX_VALIDATE, {scannedBoxesAndCrates: this.scannedBoxesAndCrates});
    }

    public delete(index) {
        this.scannedBoxesAndCrates.splice(index, 1);
        this.toastService.show(`La Box / Caisse a bien été supprimée`);
    }
}
