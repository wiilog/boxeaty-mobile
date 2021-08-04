import {Component} from '@angular/core';
import {StorageService} from '@app/services/storage.service';
import {Depository} from '@app/entities/depository';
import {ApiService} from '@app/services/api.service';
import {LoadingController, ViewWillEnter} from '@ionic/angular';
import {NavService} from '@app/services/nav.service';

@Component({
    selector: 'bx-list',
    templateUrl: './list.page.html',
    styleUrls: ['./list.page.scss'],
})
export class ListPage implements ViewWillEnter {

    public depositories: Array<{ label: string; value: number }> = undefined;
    public preparations: Array<{ id: number; client: string; crateAmount: number; tokenAmount: number; orderNumber: string }> = undefined;

    constructor(private storage: StorageService, private api: ApiService,
                private loader: LoadingController, private navService: NavService) {
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
        this.loader.create({
            message: 'Chargement des préparations en cours...',
        }).then((loader) => {
            loader.present().then(() => {
                this.api.request(ApiService.PREPARATIONS, {depository}).subscribe(
                    (preparations) => {
                        loader.dismiss();
                        this.preparations = preparations;
                    },
                    () => loader.dismiss()
                );
            });
        });
    }

    public crateToPrepare(preparation): void {
        this.navService.push(NavService.CRATE_TO_PREPARE, {preparation});
    }

}
