import {Component, OnInit} from '@angular/core';
import {NavService} from '@app/services/nav.service';
import {LoadingController, ViewWillEnter} from '@ionic/angular';
import {ApiService} from '@app/services/api.service';
import {ToastService} from '@app/services/toast.service';
import {Stream} from '@app/utils/stream';
import {PreparationCrate, Preparation} from '@app/pages/preparation/preparation';

@Component({
    selector: 'bx-preparation-crate-picking',
    templateUrl: './preparation-crate-picking.page.html',
    styleUrls: ['./preparation-crate-picking.page.scss'],
})
export class PreparationCratePickingPage implements OnInit, ViewWillEnter {

    public crateType: PreparationCrate;
    public preparation: Preparation;

    public availableCrates: Array<{location: string; crates: Array<PreparationCrate>}> = [];

    constructor(private nav: NavService,
                private api: ApiService,
                private loader: LoadingController,
                private toastService: ToastService) {
    }

    public ngOnInit(): void {
        this.crateType = this.nav.param<PreparationCrate>(`crate`);
        this.preparation = this.nav.param<Preparation>(`preparation`);
        this.getAvailableCrates(this.crateType);
    }

    public ionViewWillEnter(): void {
        this.preparation = this.nav.param<any>(`preparation`);
    }

    public treatCrate(crate: PreparationCrate|string): void {
        const values = Object.values(this.availableCrates);
        const crates = Stream.flatten(values);

        const selectedCrate = (typeof crate === 'string')
            ? crates.find(({number}) => (number === crate))
            : crate;

        if (selectedCrate) {
            this.nav.push(NavService.PREPARATION_BOX_PICKING, {
                crate: {
                    ...this.crateType,
                    number: selectedCrate.number,
                    id: selectedCrate.id
                },
                preparation: this.preparation
            });
        } else {
            this.toastService.show(`La caisse <strong>${crate}</strong> n'est pas disponible`);
        }
    }

    public get pageSubtitle(): string {
        const availableCratesLength = Object.keys(this.availableCrates).length;
        const s = availableCratesLength > 1 ? 's' : '';
        return availableCratesLength > 0
            ? `Caisse${s} disponible${s}`
            : `Aucune caisse disponible`;
    }

    private getAvailableCrates(crateType: PreparationCrate) {
        const ignoredIds = this.preparation.treatedCrates.map(({id}) => id);
        const params = {
            preparation: this.preparation.id,
            type: crateType.type
        };

        this.api
            .request(ApiService.AVAILABLE_CRATES, params, `Chargement des caisses disponibles`)
            .subscribe((availableCrates: Array<PreparationCrate & { location: string; }>) => {
                const availableCratesGrouped = availableCrates
                    .filter(({id}) => ignoredIds.indexOf(id) === -1)
                    .reduce((acc, {location, ...crate}) => {
                        if (!acc[location]) {
                            acc[location] = [];
                        }
                        acc[location].push(crate);
                        return acc;
                    }, {});

                this.availableCrates = Object.keys(availableCratesGrouped)
                    .map((location) => ({
                        location,
                        crates: availableCratesGrouped[location]
                    }));
            });
    }

}
