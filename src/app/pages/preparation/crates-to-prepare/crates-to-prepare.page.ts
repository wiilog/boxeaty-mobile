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

    public preparedCrates: Array<{ number: string; type: string }> = [];
    public pendingCrates: Array<{ number: string; type: string }> = [];

    constructor(private loader: LoadingController, private api: ApiService, private nav: NavService) {
    }

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
        this.api.request(ApiService.CRATES_TO_PREPARE, {preparation}, `Chargement des caisses en cours...`)
            .subscribe((crates) => {
                this.pendingCrates = crates;
            });
    }

}
