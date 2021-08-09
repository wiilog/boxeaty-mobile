import {Component} from '@angular/core';
import {StorageService} from '@app/services/storage.service';
import {Depository} from '@app/entities/depository';
import {ApiService} from '@app/services/api.service';
import {LoadingController, ViewWillEnter} from '@ionic/angular';
import {NavService} from '@app/services/nav.service';
import {ToastService} from "@app/services/toast.service";

@Component({
    selector: 'bx-list',
    templateUrl: './list.page.html',
    styleUrls: ['./list.page.scss'],
})
export class ListPage implements ViewWillEnter {

    public depositories: Array<{ label: string; value: number }> = undefined;
    public toPrepare: Array<{ id: number; client: string; crateAmount: number; tokenAmount: number; orderNumber: string; operator: string }> = [];
    public preparing: Array<{ id: number; client: string; crateAmount: number; tokenAmount: number; orderNumber: string; operator: string }> = [];

    constructor(private storage: StorageService, private api: ApiService,
                private loader: LoadingController, private navService: NavService,
                private toast: ToastService) {
    }

    public ionViewWillEnter(): void {
        this.storage.get<Depository>('depository').then(depositories => {
            this.depositories = depositories.map(depository => ({
                value: depository.id,
                label: depository.name,
            }));
        });

        this.getPreparations();
    }

    public getPreparations(depository = undefined): void {
        this.api.request(ApiService.PREPARATIONS, {
            depository
        }, `Chargement des préparations en cours...`)
            .subscribe(
                ({toPrepare, preparing}) => {
                    this.toPrepare = toPrepare;
                    this.preparing = preparing;
                });
    }

    public cratesToPrepare(preparation): void {
        this.navService.push(NavService.CRATE_TO_PREPARE, {preparation});
    }

    public blocked(): void {
        this.toast.show(`Cette préparation est déjà en cours de traitement par un autre opérateur.`);
    }
}
