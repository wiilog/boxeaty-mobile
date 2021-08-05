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

    public availableCrates = {};

    constructor(private nav: NavService, private api: ApiService,
                private loader: LoadingController, private toastService: ToastService) {
    }

    public ionViewWillEnter(): void {
        this.nav.readParams((param) => {
            this.type = param.type;
            this.preparation = param.preparation;
            this.getAvailableCrates(this.type);
        });
    }

    public treatCrate(crate): void {
        const values = Object.values(this.availableCrates);
        const crates = [].concat.apply([], values);
        if(crates.includes(crate)) {
            this.nav.push(NavService.BOX_PICKING, {
                crate,
                preparation: this.preparation
            });
        } else {
            this.toastService.show('La caisse <strong>' + crate + '</strong> n\'est pas disponible');
        }
    }

    private getAvailableCrates(type) {
        this.loader.create({
            message: 'Chargement des caisses disponibles en cours...',
        }).then((loader) => {
            loader.present().then(() => {
                this.api.request(ApiService.AVAILABLE_CRATES, {type}).subscribe((availableCrates) => {
                    loader.dismiss();
                    this.availableCrates = availableCrates;
                }, () => {
                    loader.dismiss();
                });
            });
        });
    }

}
