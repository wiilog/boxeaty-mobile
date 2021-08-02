import {Component} from '@angular/core';
import {ApiService} from '@app/services/api.service';
import {LoadingController, ViewWillEnter} from '@ionic/angular';
import {NavService} from '@app/services/nav.service';

@Component({
    selector: 'bx-crates-to-prepare',
    templateUrl: './crates-to-prepare.page.html',
    styleUrls: ['./crates-to-prepare.page.scss'],
})
export class CratesToPreparePage implements ViewWillEnter {

    public preparation: string;

    public cratesToPrepare: Array<{ id: number; crateNumber: string; boxType: string }> = [];
    public preparedCrates: Array<{ id: number; crateNumber: string; boxType: string }> = [];

    constructor(private loader: LoadingController, private api: ApiService, private nav: NavService) {}

    public ionViewWillEnter(): void {
        this.nav.readParams((param) => {
            this.preparation = param.preparation;
            this.getCratesToPrepare(this.preparation);
        });
    }

    public treatCrate(): void {
        // TODO
    }

    public endPreparations(): void {
        // TODO
    }

    private getCratesToPrepare(preparation?: string) {
        this.loader.create({
            message: 'Chargement des caisses en cours...',
        }).then((loader) => {
            loader.present().then(() => {
                this.api.request(ApiService.CRATES_TO_PREPARE, {preparation}).subscribe((cratesToPrepare) => {
                    loader.dismiss();
                    this.cratesToPrepare = cratesToPrepare;
                }, () => {
                    loader.dismiss();
                });
            });
        });
    }

}
