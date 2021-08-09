import {Component} from '@angular/core';
import {NavService} from '@app/services/nav.service';
import {LoadingController, ViewWillEnter} from '@ionic/angular';
import {ApiService} from '@app/services/api.service';
import {ToastService} from '@app/services/toast.service';

@Component({
    selector: 'bx-crate-picking',
    templateUrl: './crate-picking.page.html',
    styleUrls: ['./crate-picking.page.scss'],
})
export class CratePickingPage implements ViewWillEnter {

    public type: string;
    public preparation: string;

    public availableCrates: {[key: string]: Array<string>} = {};

    constructor(private nav: NavService, private api: ApiService,
                private loader: LoadingController, private toastService: ToastService) {
    }

    public ionViewWillEnter(): void {
        this.type = this.nav.param<string>(`type`);
        this.preparation = this.nav.param<string>(`preparation`);
        this.getAvailableCrates(this.type);
    }

    public treatCrate(crate): void {
        const values = Object.values(this.availableCrates);
        const crates = [].concat.apply([], values);
        if (crates.includes(crate)) {
            this.nav.push(NavService.BOX_PICKING, {
                crate,
                preparation: this.preparation
            });
        } else {
            this.toastService.show('La caisse <strong>' + crate + '</strong> n\'est pas disponible');
        }
    }

    private getAvailableCrates(type) {
        this.api.request(ApiService.AVAILABLE_CRATES, {type}, `Chargement des caisses disponibles en cours...`)
            .subscribe((availableCrates) => {
                this.availableCrates = availableCrates;
            });
    }

}
