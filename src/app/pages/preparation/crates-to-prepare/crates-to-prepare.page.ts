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
    public crate: string;

    public cratesToPrepare: Array<{ id: number; number: string; type: string }> = [];
    public preparedCrates: Array<{ id: number; number: string; type: string }> = [];

    constructor(private loader: LoadingController, private api: ApiService, private nav: NavService) {}

    public ionViewWillEnter(): void {
        this.preparation = this.nav.param<string>(`preparation`);
        this.getCratesToPrepare(this.preparation);
    }

    public treatCrate(type): void {
        this.nav.push(NavService.CRATE_PICKING, {
            type,
            preparation: this.preparation
        });
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
