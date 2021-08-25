import {Component, OnInit} from '@angular/core';
import {ApiService} from '@app/services/api.service';
import {LoadingController, ViewWillEnter} from '@ionic/angular';
import {NavService} from '@app/services/nav.service';
import {Preparation, PreparationCrate} from '@app/pages/preparation/preparation';

@Component({
    selector: 'bx-preparation-crates-to-prepare',
    templateUrl: './preparation-crates-to-prepare.page.html',
    styleUrls: ['./preparation-crates-to-prepare.page.scss'],
})
export class PreparationCratesToPreparePage implements ViewWillEnter, OnInit {

    public preparation: Preparation;

    public constructor(private loader: LoadingController,
                       private api: ApiService,
                       private nav: NavService) {
    }

    public ionViewWillEnter(): void {
        const boxPicking = this.nav.param<{ crate: PreparationCrate }>('boxPicking');

        if (boxPicking && boxPicking.crate) {
            const treatedIndex = this.preparation.treatedCrates.findIndex(({number}) => (boxPicking.crate.number === number));
            if (treatedIndex === -1) {
                const untreatedIndex = this.preparation.untreatedCrates.findIndex(({type}) => (boxPicking.crate.type === type));
                if (untreatedIndex > -1) {
                    this.preparation.treatedCrates.push(boxPicking.crate);
                    this.preparation.untreatedCrates.splice(untreatedIndex, 1);
                }
            }
        }
    }

    public ngOnInit() {
        const preparation = this.nav.param<number>(`preparation`);
        this.getServerPreparation(preparation);
    }

    public treatCrate(crate: PreparationCrate): void {
        this.nav.push(NavService.PREPARATION_CRATE_PICKING, {
            crate,
            preparation: this.preparation
        });
    }

    public endCratesPreparation(): void {
        if (this.allCratesPrepared) {
            this.api.request(ApiService.PATCH_PREPARATION, {
                preparation: this.preparation.id,
                crates: this.preparation.treatedCrates
            }, `Finalisation de la préparation`).subscribe(() => {
                this.nav.pop(NavService.PREPARATION_LIST);
            });
        }
    }

    public get allCratesPrepared(): boolean {
        return (
            this.preparation
            && this.preparation.untreatedCrates.length === 0
        );
    }

    public get treatedCrates(): Array<PreparationCrate> {
        return this.preparation
            ? this.preparation.treatedCrates
            : [];
    }

    public get untreatedCrates(): Array<PreparationCrate> {
        return this.preparation
            ? this.preparation.untreatedCrates
            : [];
    }

    private getServerPreparation(preparationId?: number) {
        this.api
            .request(ApiService.GET_PREPARATION_CONTENT, {preparation: preparationId}, `Chargement des caisses`)
            .subscribe(({success, crates}) => {
                if (success) {
                    this.preparation = {
                        id: preparationId,
                        treatedCrates: [],
                        untreatedCrates: crates.map(({boxes, ...crate}) => ({
                            ...crate,
                            boxes: boxes.map((box) => ({
                                ...box,
                                selected: []
                            }))
                        }))
                    };
                }
                else {
                    this.nav.pop(NavService.PREPARATION_LIST);
                }
            });
    }
}
