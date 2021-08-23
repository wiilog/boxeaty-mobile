import {Component} from '@angular/core';
import {StorageService} from '@app/services/storage.service';
import {Depository} from '@app/entities/depository';
import {ApiService} from '@app/services/api.service';
import {LoadingController, ViewWillEnter} from '@ionic/angular';
import {NavService} from '@app/services/nav.service';
import {ToastService} from '@app/services/toast.service';
import {Preparation} from '@app/pages/preparation/preparation';

@Component({
    selector: 'bx-preparation-list',
    templateUrl: './preparation-list.page.html',
    styleUrls: ['./preparation-list.page.scss'],
})
export class PreparationListPage implements ViewWillEnter {

    public depositories: Array<{ label: string; value: number }> = undefined;
    public toPrepare: Array<{
        id: number;
        editable: boolean;
        client: string;
        crateAmount: number;
        tokenAmount: number;
        orderNumber: string;
        operator: string;
    }> = [];
    public preparing: Array<{
        id: number;
        editable: boolean;
        client: string;
        crateAmount: number;
        tokenAmount: number;
        orderNumber: string;
        operator: string;
    }> = [];

    public constructor(private storage: StorageService,
                       private api: ApiService,
                       private loader: LoadingController,
                       private navService: NavService,
                       private toastService: ToastService) {
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

    public getPreparations(depository?): void {
        const params = depository
            ? {depository}
            : {};
        this.api.request(ApiService.PREPARATIONS, params, `Chargement des préparations en cours...`)
            .subscribe(
                ({toPrepare, preparing}) => {
                    this.toPrepare = toPrepare;
                    this.preparing = preparing;
                });
    }

    public onPreparationClicked(preparation: any): void {
        if (!preparation.editable) {
            this.toastService.show(`Cette préparation est déjà en cours de traitement par un autre opérateur.`);
        }
        else {
            this.navService.push(NavService.PREPARATION_CRATES_TO_PREPARE, {
                preparation: preparation.id
            });
        }
    }
}
