import {Component, OnInit} from '@angular/core';
import {ApiService} from '@app/services/api.service';
import {LoadingController, ViewWillEnter} from '@ionic/angular';
import {NavService} from '@app/services/nav.service';

@Component({
    selector: 'bx-preparation-crates-to-prepare',
    templateUrl: './preparation-crates-to-prepare.page.html',
    styleUrls: ['./preparation-crates-to-prepare.page.scss'],
})
export class PreparationCratesToPreparePage implements ViewWillEnter, OnInit {

    public preparation: string;

    public preparedCrates: Array<{ number: string; type: string }> = [];
    public pendingCrates: Array<{ number: string; type: string }> = [];

    constructor(private loader: LoadingController, private api: ApiService, private nav: NavService) {
    }

    public ionViewWillEnter(): void {
        const crate = this.nav.param<string>('number');
        const type = this.nav.param<string>('type');

        if (crate && type) {
            const preparedCrate = this.pendingCrates.findIndex((c) => c.type === type)[0];
            this.pendingCrates.splice(preparedCrate, 1);
            this.preparedCrates.push({number: crate, type});
        }
    }

    public ngOnInit() {
        this.preparation = this.nav.param<string>(`preparation`);
        this.getPendingCrates(this.preparation);
    }

    public treatCrate(type): void {
        this.nav.push(NavService.CRATE_PICKING, {
            type,
            preparation: this.preparation
        });
    }

    public endCratesPreparation(): void {
        this.api.request(ApiService.END_PREPARATION, {
            preparation: this.preparation
        }, `Finalisation de la préparation en cours...`).subscribe(() => {
            this.nav.pop(NavService.PREPARATIONS);
        });
    }

    private getPendingCrates(preparation?: string) {
        this.api.request(ApiService.CRATES_TO_PREPARE, {
            preparation
        }, `Chargement des caisses en cours...`)
            .subscribe((crates) => {
                this.pendingCrates = crates;
            });
    }

}
